import {
	Injectable,
	NotFoundException,
	BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AddOrderItemDto } from './dto/add-order-item.dto';
import { QueryOrdersDto } from './dto/query-order.dto';

@Injectable()
export class OrdersService {
	constructor(private prisma: PrismaService) {}

	//private methods to do not repeat the code and follow DRY method from SOLID methods

	private async checkStockAvailability(
		tx: Prisma.TransactionClient,
		productId: string,
		requiredQuantity: number,
	): Promise<void> {
		const product = await tx.product.findUnique({
			where: { id: productId },
		});
		if (!product) throw new NotFoundException('Product not found');

		if (product.inStock < requiredQuantity) {
			throw new BadRequestException(
				`Not enough items in stock. Available: ${product.inStock}.`,
			);
		}
	}

	private async decreaseStock(
		tx: Prisma.TransactionClient,
		productId: string,
		quantity: number,
	): Promise<void> {
		await tx.product.update({
			where: { id: productId },
			data: { inStock: { decrement: quantity } },
		});
	}

	private async increaseStock(
		tx: Prisma.TransactionClient,
		productId: string,
		quantity: number,
	): Promise<void> {
		await tx.product.update({
			where: { id: productId },
			data: { inStock: { increment: quantity } },
		});
	}

	private async recalculateOrderTotal(
		tx: Prisma.TransactionClient,
		orderId: string,
	): Promise<void> {
		const details = await tx.orderDetail.findMany({
			where: { orderId },
		});
		const total = details.reduce(
			(s: number, d: { priceAtPurchase: number; quantity: number }) =>
				s + Number(d.priceAtPurchase) * d.quantity,
			0,
		);
		await tx.order.update({
			where: { orderId },
			data: { totalAmount: total },
		});
	}

	async createOrder(userId?: string) {
		if (!userId) {
			//prisma requires a user relation for order, can't create order if you are not auth
			throw new BadRequestException(
				'userId is required to create an order',
			);
		}

		const order = await this.prisma.order.create({
			data: {
				user: { connect: { id: userId } },
			},
		});

		return order;
	}

	async getOrder(orderId: string) {
		const order = await this.prisma.order.findUnique({
			where: { orderId },
			include: { details: true },
		});
		if (!order) throw new NotFoundException('Order not found');
		return order;
	}

	async getOrders(userId: string, query: QueryOrdersDto) {
		const where: Prisma.OrderWhereInput = {
			userId,
		};

		//filter by paymentStatus
		if (query.paymentStatus) {
			where.paymentStatus = query.paymentStatus;
		}

		//filter by deliveryStatus
		if (query.deliveryStatus) {
			where.deliveryStatus = query.deliveryStatus;
		}

		//filter by createdAt
		const orderBy: Prisma.OrderOrderByWithRelationInput = {
			createdAt: query.sortBy === 'asc' ? 'asc' : 'desc',
		};

		const orders = await this.prisma.order.findMany({
			where,
			orderBy,
			include: { details: true },
		});

		return orders;
	}

	async addItem(orderId: string, dto: AddOrderItemDto) {
		const { productId, quantity } = dto;
		if (quantity <= 0)
			throw new BadRequestException('Quantity must be positive');

		return this.prisma.$transaction(async (tx) => {
			await this.checkStockAvailability(tx, productId, quantity);

			const product = await tx.product.findUnique({
				where: { id: productId },
			});
			if (!product) throw new NotFoundException('Product not found');

			const order = await tx.order.findUnique({ where: { orderId } });
			if (!order) throw new NotFoundException('Order not found');

			const existing = await tx.orderDetail.findFirst({
				where: { orderId, productId },
			});

			if (existing) {
				const newQty = existing.quantity + quantity;
				await tx.orderDetail.update({
					where: { orderDetailId: existing.orderDetailId },
					data: { quantity: newQty },
				});
			} else {
				await tx.orderDetail.create({
					data: {
						orderId,
						productId,
						quantity,
						priceAtPurchase: product.price,
					},
				});
			}

			await this.decreaseStock(tx, productId, quantity);

			await this.recalculateOrderTotal(tx, orderId);

			return tx.order.findUnique({
				where: { orderId },
				include: { details: true },
			});
		});
	}

	async updateItemQuantity(
		orderId: string,
		orderDetailId: string,
		quantity: number,
	) {
		if (quantity < 0)
			throw new BadRequestException('Quantity must be >= 0');

		return this.prisma.$transaction(async (tx) => {
			const detail = await tx.orderDetail.findUnique({
				where: { orderDetailId },
			});
			if (!detail || detail.orderId !== orderId)
				throw new NotFoundException('Order item not found');

			const quantityDiff = quantity - detail.quantity;

			if (quantity === 0) {
				//return product to stock before deleting
				await this.increaseStock(tx, detail.productId, detail.quantity);
				await tx.orderDetail.delete({ where: { orderDetailId } });
			} else {
				//if increasing quantity, check stock availability
				if (quantityDiff > 0) {
					await this.checkStockAvailability(
						tx,
						detail.productId,
						quantityDiff,
					);
					await this.decreaseStock(
						tx,
						detail.productId,
						quantityDiff,
					);
				} else if (quantityDiff < 0) {
					//if decreasing quantity, return to stock
					await this.increaseStock(
						tx,
						detail.productId,
						Math.abs(quantityDiff),
					);
				}

				await tx.orderDetail.update({
					where: { orderDetailId },
					data: { quantity },
				});
			}

			//recalculate total
			await this.recalculateOrderTotal(tx, orderId);

			return tx.order.findUnique({
				where: { orderId },
				include: { details: true },
			});
		});
	}

	async removeItem(orderId: string, orderDetailId: string) {
		return this.updateItemQuantity(orderId, orderDetailId, 0);
	}
}
