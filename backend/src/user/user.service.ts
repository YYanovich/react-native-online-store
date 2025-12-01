import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateProfileDto, ChangePasswordDto } from './dto';

export interface UserProfile {
	id: string;
	email: string;
	fullName: string | null;
	phoneNumber: string | null;
	shippingAddress: string | null;
}

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.UserCreateInput) {
		return this.prisma.user.create({ data });
	}

	async findByEmail(email: string) {
		return this.prisma.user.findUnique({ where: { email } });
	}

	async findById(id: string) {
		return this.prisma.user.findUnique({ where: { id } });
	}

	async update(id: string, data: Prisma.UserUpdateInput) {
		return this.prisma.user.update({ where: { id }, data });
	}

	async updateProfile(userId: string, dto: UpdateProfileDto): Promise<UserProfile> {
		const user = await this.findById(userId);
		if (!user) {
			throw new NotFoundException('User not found');
		}

		const updated = await this.prisma.user.update({
			where: { id: userId },
			data: {
				fullName: dto.fullName,
				phoneNumber: dto.phoneNumber,
				shippingAddress: dto.shippingAddress,
			},
			select: {
				id: true,
				email: true,
				fullName: true,
				phoneNumber: true,
				shippingAddress: true,
			},
		});

		return updated;
	}

	async changePassword(userId: string, dto: ChangePasswordDto): Promise<{ success: boolean }> {
		if (dto.newPassword !== dto.confirmPassword) {
			throw new BadRequestException('New passwords do not match');
		}

		const user = await this.findById(userId);
		if (!user) {
			throw new NotFoundException('User not found');
		}

		const isOldPasswordValid = await bcrypt.compare(dto.oldPassword, user.password);
		if (!isOldPasswordValid) {
			throw new BadRequestException('Current password is incorrect');
		}

		const hashedNewPassword = await bcrypt.hash(dto.newPassword, 10);

		await this.prisma.user.update({
			where: { id: userId },
			data: { password: hashedNewPassword },
		});

		return { success: true };
	}

	async getProfile(userId: string): Promise<UserProfile> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				email: true,
				fullName: true,
				phoneNumber: true,
				shippingAddress: true,
			},
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}

	async deleteAccount(userId: string): Promise<{ success: boolean }> {
		const user = await this.findById(userId);
		if (!user) {
			throw new NotFoundException('User not found');
		}

		const userOrders = await this.prisma.order.findMany({
			where: { userId },
			select: { orderId: true },
		});
		const orderIds = userOrders.map((order) => order.orderId);

		// Delete payments for user's orders
		await this.prisma.payment.deleteMany({
			where: { orderId: { in: orderIds } },
		});

		// Delete order details for user's orders
		await this.prisma.orderDetail.deleteMany({
			where: { orderId: { in: orderIds } },
		});

		// Delete user's orders
		await this.prisma.order.deleteMany({ where: { userId } });

		// Delete user
		await this.prisma.user.delete({ where: { id: userId } });

		return { success: true };
	}
}
