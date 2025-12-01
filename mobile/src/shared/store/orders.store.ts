import { create } from 'zustand';
import { ordersService } from '../services/orders.service';
import { Order, OrderItemInput } from '../types/order.types';
import Toast from 'react-native-toast-message';
import { useAuthStore } from './auth.store';
import {
	IOrdersFilters,
	TPaymentStatus,
	TDeliveryStatus,
	TSortOrder,
} from '../../modules/main/screens/orders/types';

interface OrdersState {
	orders: Order[];
	filters: IOrdersFilters;
	loading: boolean;
	error: string | null;
	fetchOrders: () => Promise<void>;
	setPaymentStatus: (status: TPaymentStatus) => void;
	setDeliveryStatus: (status: TDeliveryStatus) => void;
	setSortBy: (order: TSortOrder) => void;
	createOrderFromCart: (items: OrderItemInput[]) => Promise<Order | null>;
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
	orders: [],
	filters: {
		paymentStatus: 'All',
		deliveryStatus: 'All',
		sortBy: 'All',
	},
	loading: false,
	error: null,

	fetchOrders: async () => {
		set({ loading: true, error: null });
		try {
			const { filters } = get();
			const orders = await ordersService.getOrders(filters);
			set({ orders, loading: false });
		} catch (error) {
			set({ error: 'Failed to fetch orders', loading: false });
		}
	},

	setPaymentStatus: (status) => {
		set((state) => ({
			filters: { ...state.filters, paymentStatus: status },
		}));
		get().fetchOrders();
	},

	setDeliveryStatus: (status) => {
		set((state) => ({
			filters: { ...state.filters, deliveryStatus: status },
		}));
		get().fetchOrders();
	},

	setSortBy: (order) => {
		set((state) => ({ filters: { ...state.filters, sortBy: order } }));
		get().fetchOrders();
	},

	createOrderFromCart: async (items: OrderItemInput[]) => {
		set({ loading: true, error: null });
		try {
			const user = useAuthStore.getState().user;
			if (!user) {
				throw new Error('User not authenticated');
			}
			const order = await ordersService.createOrder(user.id);
			
			await Promise.all(items.map(item => ordersService.addItem(order.orderId, item)));

			get().fetchOrders();
			return order;
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error &&
				'response' in error &&
				typeof error.response === 'object' &&
				error.response !== null &&
				'data' in error.response &&
				typeof error.response.data === 'object' &&
				error.response.data !== null &&
				'message' in error.response.data
					? String(error.response.data.message)
					: (error instanceof Error ? error.message : 'Failed to create order');
			set({ error: errorMessage, loading: false });
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: errorMessage,
			});
			return null;
		}
	},
}));
