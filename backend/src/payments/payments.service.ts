import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePaymentDto) {
  const order = await this.prisma.order.findUnique({ where: { orderId: dto.orderId } });
  if (!order) throw new NotFoundException('Order not found');

  const existing = await this.prisma.payment.findUnique({ where: { orderId: dto.orderId } });
  if (existing) throw new BadRequestException('Payment already exists for this order');

  const transactionId = randomUUID();

  const payment = await this.prisma.payment.create({
    data: {
      order: { connect: { orderId: dto.orderId } },
      totalAmount: order.totalAmount,
      paymentStatus: 'SUCCESS',
      transactionId,
    },
  });

  await this.prisma.order.update({
    where: { orderId: dto.orderId },
    data: {
      paymentStatus: 'COMPLETE',
    },
  });

  return payment;
}


  async findOne(paymentId: string) {
    const payment = await this.prisma.payment.findUnique({ where: { paymentId } });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async findByOrder(orderId: string) {
    return this.prisma.payment.findUnique({ where: { orderId } });
  }
}
