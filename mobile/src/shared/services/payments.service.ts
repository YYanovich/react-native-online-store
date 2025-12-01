import { mainAxios } from './mainAxios';

export interface Payment {
	paymentId: string;
	orderId: string;
	totalAmount: number;
	paymentStatus: 'SUCCESS' | 'FAILED';
	transactionId: string;
	createdAt: string;
	updatedAt: string;
}

export class PaymentsService {
	static async createPayment(orderId: string): Promise<Payment> {
		const response = await mainAxios.post<Payment>('/payments', { orderId });
		return response.data;
	}

	static async getPaymentByOrder(orderId: string): Promise<Payment | null> {
		const response = await mainAxios.get<Payment>(`/payments/order/${orderId}`);
		return response.data;
	}

	static async getPaymentById(paymentId: string): Promise<Payment> {
		const response = await mainAxios.get<Payment>(`/payments/${paymentId}`);
		return response.data;
	}
}

export const paymentsService = {
	createPayment: PaymentsService.createPayment,
	getPaymentByOrder: PaymentsService.getPaymentByOrder,
	getPaymentById: PaymentsService.getPaymentById,
};
