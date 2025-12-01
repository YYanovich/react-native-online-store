import { PaymentStatus, DeliveryStatus, Order } from '../../../../../shared/types/order.types';

export { Order };

export enum SortOrder {
	ASC = 'asc',
	DESC = 'desc',
}

export type TPaymentStatus = PaymentStatus | 'All';
export type TDeliveryStatus = DeliveryStatus | 'All';
export type TSortOrder = SortOrder | 'All';

export interface IOrdersFilters {
  paymentStatus: TPaymentStatus;
  deliveryStatus: TDeliveryStatus;
  sortBy: TSortOrder;
}
