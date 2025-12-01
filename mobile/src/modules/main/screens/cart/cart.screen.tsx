import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProductsStackParamList } from '../../../navigation/types/screen-params.type';
import { NAVIGATION_KEYS } from '../../../navigation/constants';
import { styles } from './cart.screen.styles';
import Toast from 'react-native-toast-message';
import { useOrdersStore } from '../../../../shared/store/orders.store';
import { useCartStore, CartState } from '../../../../shared/store/cart.store';
import { CartItem as CartItemType } from '../../../../shared/types/cart.types';
import { CartItem } from '../../../../shared/componetnts/cartItem/cartItem.component';
import CartIcon from '../../../../../assets/images/Cart.svg';

type NavigationProp = StackNavigationProp<ProductsStackParamList, 'CartScreen'>;

export const CartScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();

	const items = useCartStore((state: CartState) => state.items);
	const getTotal = useCartStore((state: CartState) => state.getTotal);
	const getItemCount = useCartStore((state: CartState) => state.getItemCount);
	const clearCart = useCartStore((state: CartState) => state.clearCart);

	const handleDelete = (productId: string) => {
		navigation.navigate('EditCartScreen', { productId });
	};

	const renderItem = ({ item }: { item: CartItemType }) => (
		<CartItem item={item} onDelete={handleDelete} />
	);

	const renderEmpty = () => (
		<View style={styles.emptyContainer}>
			<Text style={styles.emptyText}>Cart is empty</Text>
		</View>
	);

	const createOrderFromCart = useOrdersStore((s) => s.createOrderFromCart);

	const handleCreateOrder = async () => {
		if (items.length === 0) return;
		const payload = items.map((ci: CartItemType) => ({
			productId: ci.productId,
			quantity: ci.quantity,
		}));
		const order = await createOrderFromCart(payload);
		if (order) {
			Toast.show({
				type: 'success',
				text1: 'Order created',
				text2: `ID: ${order.orderId.slice(0, 8)}`,
			});
			clearCart();
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [
						{
							name: NAVIGATION_KEYS.MAIN_STACK,
							state: { routes: [{ name: NAVIGATION_KEYS.ORDERS }] },
						},
					],
				}),
			);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.goBack()}
					activeOpacity={0.7}
				>
					<Text style={styles.backIcon}>‹</Text>
				</TouchableOpacity>
				<Text style={styles.title}>Cart</Text>
				<TouchableOpacity
					style={styles.cartIconContainer}
					onPress={() => navigation.navigate('CartScreen')}
					activeOpacity={0.7}
				>
					<CartIcon width={28} height={28} />
					{getItemCount() > 0 && (
						<View style={styles.badge}>
							<Text style={styles.badgeText}>{getItemCount()}</Text>
						</View>
					)}
				</TouchableOpacity>
			</View>

			<View style={styles.totalContainer}>
				<Text style={styles.totalCombined}>Total amount: ${getTotal().toFixed(0)}</Text>
			</View>

			<FlatList
				data={items}
				renderItem={renderItem}
				keyExtractor={(item) => item.productId}
				ListEmptyComponent={renderEmpty}
				contentContainerStyle={styles.listContent}
				style={styles.list}
			/>

			{items.length > 0 && (
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.createOrderButton}
						onPress={handleCreateOrder}
						activeOpacity={0.8}
					>
						<Text style={styles.createOrderButtonText}>Create Order</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};
