import { IsEnum, IsOptional } from 'class-validator';
import { PaymentStatus, DeliveryStatus } from '@prisma/client';

export enum SortOrder {
	ASC = 'asc',
	DESC = 'desc',
}

export class QueryOrdersDto {
	@IsOptional()
	@IsEnum(PaymentStatus)
	paymentStatus?: PaymentStatus;

	@IsOptional()
	@IsEnum(DeliveryStatus)
	deliveryStatus?: DeliveryStatus;

	@IsOptional()
	@IsEnum(SortOrder)
	sortBy?: SortOrder;
}
