import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../types/cart.types';
import { STORAGE_KEYS } from '../constants/storage';

export interface CartState {
	items: CartItem[];
	addItem: (
		productId: string,
		name: string,
		price: number,
		quantity: number,
		description: string,
		inStock: number,
		category: string,
	) => void;
	removeItem: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
	getTotal: () => number;
	getItemCount: () => number;
	loadCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
	items: [],

	addItem: (productId, name, price, quantity, description, inStock, category) => {
		set((state) => {
			const existingItem = state.items.find((item) => item.productId === productId);
			let newItems: CartItem[];

			if (existingItem) {
				newItems = state.items.map((item) =>
					item.productId === productId
						? { ...item, quantity: item.quantity + quantity }
						: item,
				);
			} else {
				newItems = [
					...state.items,
					{ productId, name, price, quantity, description, inStock, category },
				];
			}

			AsyncStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(newItems));
			return { items: newItems };
		});
	},

	removeItem: (productId) => {
		set((state) => {
			const newItems = state.items.filter((item) => item.productId !== productId);
			AsyncStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(newItems));
			return { items: newItems };
		});
	},

	updateQuantity: (productId, quantity) => {
		set((state) => {
			const newItems = state.items.map((item) =>
				item.productId === productId ? { ...item, quantity } : item,
			);
			AsyncStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(newItems));
			return { items: newItems };
		});
	},

	clearCart: () => {
		AsyncStorage.removeItem(STORAGE_KEYS.CART_DATA);
		set({ items: [] });
	},

	getTotal: () => {
		const state = get();
		return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
	},

	getItemCount: () => {
		const state = get();
		return state.items.reduce((count, item) => count + item.quantity, 0);
	},

	loadCart: async () => {
		try {
			const cartData = await AsyncStorage.getItem(STORAGE_KEYS.CART_DATA);
			if (cartData) {
				set({ items: JSON.parse(cartData) });
			}
		} catch (error) {
			console.error('Failed to load cart:', error);
		}
	},
}));
