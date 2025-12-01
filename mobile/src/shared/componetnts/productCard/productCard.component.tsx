import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Product } from '../../types/product.types';
import { styles } from './productCard.component.styles';

interface ProductCardProps {
	product: Product;
	onPress: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
	product,
	onPress,
}) => {
	return (
		<TouchableOpacity
			style={styles.card}
			onPress={() => onPress(product.id)}
			activeOpacity={0.7}
		>
			<View style={styles.row}>
				<Text style={styles.name} numberOfLines={1}>
					{product.name}
				</Text>
				<Text style={styles.price}>
					<Text style={styles.priceLabel}>Price: </Text>$
					{product.price}
				</Text>
			</View>

			<Text style={styles.category}>
				<Text style={styles.categoryLabel}>Category: </Text>
				{product.category}
			</Text>
		</TouchableOpacity>
	);
};
