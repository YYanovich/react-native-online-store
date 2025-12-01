import { mainAxios } from './mainAxios';
import { Order, OrderItemInput, OrderWithDetails } from '../types/order.types';
import { IOrdersFilters } from '../../modules/main/screens/orders/types';

export class OrdersApi {
	static async createOrder(userId: string): Promise<Order> {
		const response = await mainAxios.post<Order>('/orders', { userId });
		return response.data;
	}

	static async addItem(orderId: string, item: OrderItemInput): Promise<Order> {
		const response = await mainAxios.post<Order>(`/orders/${orderId}/items`, item);
		return response.data;
	}

	static async getOrderById(orderId: string): Promise<OrderWithDetails> {
		const response = await mainAxios.get<OrderWithDetails>(`/orders/${orderId}`);
		return response.data;
	}

	static async removeItem(orderId: string, itemId: string): Promise<OrderWithDetails> {
		const response = await mainAxios.delete<OrderWithDetails>(`/orders/${orderId}/items/${itemId}`);
		return response.data;
	}
}

const getOrders = async (filters: IOrdersFilters) => {
	const params = {
		paymentStatus: filters.paymentStatus === 'All' ? undefined : filters.paymentStatus,
		deliveryStatus: filters.deliveryStatus === 'All' ? undefined : filters.deliveryStatus,
		sortBy: filters.sortBy === 'All' ? undefined : filters.sortBy,
	};

	const { data } = await mainAxios.get('/orders', { params });
	return data;
};

export const ordersService = {
	getOrders,
	createOrder: OrdersApi.createOrder,
	addItem: OrdersApi.addItem,
	getOrderById: OrdersApi.getOrderById,
	removeItem: OrdersApi.removeItem,
};
