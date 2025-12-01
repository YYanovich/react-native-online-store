export enum PaymentStatus {
	COMPLETE = 'COMPLETE',
	FAILED = 'FAILED',
	PENDING = 'PENDING',
}

export enum DeliveryStatus {
	PENDING = 'PENDING',
	IN_TRANSIT = 'IN_TRANSIT',
	DELIVERED = 'DELIVERED',
}

export interface OrderItemInput {
	productId: string;
	quantity: number;
}

export interface Order {
	orderId: string;
	totalAmount: number;
	createdAt: string;
	paymentStatus: PaymentStatus;
	deliveryStatus: DeliveryStatus;
}

export interface OrderDetailItem {
  orderDetailId: string;
  orderId: string;
  productId: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface OrderWithDetails extends Order {
  details: OrderDetailItem[];
}


