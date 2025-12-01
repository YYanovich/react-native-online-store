import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	ScrollView,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ProductsStackParamList } from '../../../navigation/types/screen-params.type';
import { Product } from '../../../../shared/types/product.types';
import { ProductService } from '../../../../shared/services/product.service';
import { COLORS } from '../../../../shared/styles';
import { styles } from './productDetails.screen.styles';
import { useCartStore, CartState } from '../../../../shared/store/cart.store';
import Toast from 'react-native-toast-message';
import CartIcon from '../../../../../assets/images/Cart.svg';

type ProductDetailsRouteProp = RouteProp<
	ProductsStackParamList,
	'ProductDetails'
>;

export const ProductDetailsScreen: React.FC = () => {
	const route = useRoute<ProductDetailsRouteProp>();
	const navigation = useNavigation();
	const { productId } = route.params;
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [amount, setAmount] = useState(1);
	const addItem = useCartStore((state: CartState) => state.addItem);
	const itemCount = useCartStore((state: CartState) => state.getItemCount());

	const handleCartPress = () => {
		navigation.navigate('CartScreen' as never);
	};

	const handleAddToCart = () => {
		if (product) {
			addItem(
				product.id,
				product.name,
				product.price,
				amount,
				product.description,
				product.inStock,
				product.category,
			);
			Toast.show({
				type: 'success',
				text1: 'Added to cart',
				text2: `${amount}x ${product.name} added to cart`,
				visibilityTime: 2000,
			});
			setAmount(1);
		}
	};

	const handleIncrement = () => {
		setAmount((prev) => prev + 1);
	};

	const handleDecrement = () => {
		if (amount > 1) {
			setAmount((prev) => prev - 1);
		}
	};

	useEffect(() => {
		loadProduct();
	}, [productId]);

	const loadProduct = async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await ProductService.getProductById(productId);
			setProduct(data);
		} catch (err) {
			setError('Failed to load product details');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={COLORS.primary} />
			</View>
		);
	}

	if (error || !product) {
		return (
			<View style={styles.centered}>
				<Text style={styles.errorText}>
					{error || 'Product not found'}
				</Text>
			</View>
		);
	}

	return (
		<View style={styles.wrapper}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					activeOpacity={0.7}
					style={styles.backButton}
				>
					<Text style={styles.backIcon}>‹</Text>
				</TouchableOpacity>
				<Text style={styles.title}>Product information</Text>
				<TouchableOpacity
					style={styles.cartIconContainer}
					onPress={handleCartPress}
					activeOpacity={0.7}
				>
					<CartIcon width={28} height={28} />
					{itemCount > 0 && (
						<View style={styles.badge}>
							<Text style={styles.badgeText}>{itemCount}</Text>
						</View>
					)}
				</TouchableOpacity>
			</View>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.content}
			>
				<Text style={styles.label}>Name:</Text>
				<Text style={styles.value}>{product.name}</Text>

				<Text style={styles.label}>Description:</Text>
				<Text style={styles.description}>{product.description}</Text>

				<Text style={styles.label}>In Stock:</Text>
				<Text style={styles.value}>{product.inStock}</Text>

				<Text style={styles.label}>Price:</Text>
				<Text style={styles.value}>${product.price}</Text>

				<Text style={styles.label}>Category:</Text>
				<Text style={styles.value}>{product.category}</Text>

				<Text style={styles.label}>Amount:</Text>
				<View style={styles.amountContainer}>
					<TouchableOpacity
						style={styles.amountButton}
						onPress={handleDecrement}
						activeOpacity={0.7}
						disabled={amount <= 1}
					>
						<Text style={styles.amountButtonText}>-</Text>
					</TouchableOpacity>
					<View style={styles.amountValueWrapper}>
						<Text style={styles.amountValue}>{amount}</Text>
					</View>
					<TouchableOpacity
						style={[styles.amountButton, styles.amountButtonIncrement]}
						onPress={handleIncrement}
						activeOpacity={0.7}
					>
						<Text style={[styles.amountButtonText, styles.amountButtonIncrementText]}>+</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.addButton}
					activeOpacity={0.8}
					onPress={handleAddToCart}
				>
					<Text style={styles.buttonText}>Add to Cart</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
