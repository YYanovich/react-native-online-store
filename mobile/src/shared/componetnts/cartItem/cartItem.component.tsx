import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CartItem as CartItemType } from '../../types/cart.types';
import { styles } from './cartItem.component.styles';
import BinIcon from '../../../../assets/images/Bin.svg';

interface CartItemProps {
	item: CartItemType;
	onDelete?: (productId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onDelete }) => {
	const total = item.price * item.quantity;

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.name}>{item.name}</Text>
				<View style={styles.footer}>
					<Text style={styles.totalLabel}>
						Total: <Text style={styles.totalValue}>${total.toFixed(0)}</Text>
					</Text>
					<Text style={styles.amountLabel}>
						Amount: <Text style={styles.amountValue}>{item.quantity}</Text>
					</Text>
				</View>
			</View>
			{onDelete && (
				<TouchableOpacity
					style={styles.deleteButton}
					onPress={() => onDelete(item.productId)}
					activeOpacity={0.7}
				>
					<BinIcon width={24} height={24} />
				</TouchableOpacity>
			)}
		</View>
	);
};
