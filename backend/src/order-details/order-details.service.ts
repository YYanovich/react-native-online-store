import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderDetailsService {
	constructor(private prisma: PrismaService) {}

	async getById(orderDetailId: string) {
		const detail = await this.prisma.orderDetail.findUnique({
			where: { orderDetailId },
		});
		if (!detail) throw new NotFoundException('Order detail not found');
		return detail;
	}
}
