import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ProductsStackParamList } from '../../../navigation/types/screen-params.type';
import { useCartStore, CartState } from '../../../../shared/store/cart.store';
import { CartItem } from '../../../../shared/types/cart.types';
import { styles } from './editCart.screen.styles';
import CartIcon from '../../../../../assets/images/Cart.svg';

type EditCartScreenRouteProp = RouteProp<ProductsStackParamList, 'EditCartScreen'>;
type NavigationProp = StackNavigationProp<ProductsStackParamList, 'EditCartScreen'>;

export const EditCartScreen: React.FC = () => {
	const route = useRoute<EditCartScreenRouteProp>();
	const navigation = useNavigation<NavigationProp>();

	const { productId } = route.params;

	const items = useCartStore((state: CartState) => state.items);
	const updateQuantity = useCartStore((state: CartState) => state.updateQuantity);
	const removeItem = useCartStore((state: CartState) => state.removeItem);
	const getItemCount = useCartStore((state: CartState) => state.getItemCount);

	const cartItem = items.find((item: CartItem) => item.productId === productId);

	const [removeAmount, setRemoveAmount] = React.useState<number>(() =>
		cartItem ? cartItem.quantity : 1,
	);

	React.useEffect(() => {
		if (cartItem) {
			setRemoveAmount(cartItem.quantity);
		}
	}, [cartItem?.quantity]);

	if (!cartItem) {
		return (
			<View style={styles.container}>
				<Text style={styles.errorText}>Item not found</Text>
			</View>
		);
	}

	const { name, quantity, price, description, inStock, category } = cartItem;

	const handleIncrement = () => {
		if (removeAmount < quantity) setRemoveAmount(removeAmount + 1);
	};

	const handleDecrement = () => {
		if (removeAmount > 1) setRemoveAmount(removeAmount - 1);
	};

	const handleRemove = () => {
		const newQuantity = quantity - removeAmount;
		if (newQuantity <= 0) {
			removeItem(productId);
		} else {
			updateQuantity(productId, newQuantity);
		}
		navigation.goBack();
	};

	const handleSave = () => {
		navigation.goBack();
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
				<Text style={styles.title}>Edit Cart Item</Text>
				<TouchableOpacity
					style={styles.cartIconContainer}
					onPress={() => navigation.navigate('CartScreen')}
					activeOpacity={0.7}
				>
					<CartIcon/>
					{getItemCount() > 0 && (
						<View style={styles.badge}>
							<Text style={styles.badgeText}>{getItemCount()}</Text>
						</View>
					)}
				</TouchableOpacity>
			</View>

			<ScrollView
				style={styles.content}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.contentContainer}
			>
				<View style={styles.infoSection}>
					<Text style={styles.label}>Name:</Text>
					<Text style={styles.value}>{name}</Text>
				</View>

				{description && (
					<View style={styles.infoSection}>
						<Text style={styles.label}>Description:</Text>
						<Text style={styles.value}>{description}</Text>
					</View>
				)}

				{typeof inStock === 'number' && (
					<View style={styles.infoSection}>
						<Text style={styles.label}>In Stock:</Text>
						<Text style={styles.value}>{inStock}</Text>
					</View>
				)}

				<View style={styles.infoSection}>
					<Text style={styles.label}>Price:</Text>
					<Text style={styles.value}>${price.toFixed(2)}</Text>
				</View>

				{category && (
					<View style={styles.infoSection}>
						<Text style={styles.label}>Category:</Text>
						<Text style={styles.value}>{category}</Text>
					</View>
				)}

				<View style={styles.infoSection}>
					<Text style={styles.label}>Amount:</Text>
					<View style={styles.quantityContainer}>
						<TouchableOpacity
							style={styles.quantityButton}
							onPress={handleDecrement}
							activeOpacity={0.7}
						>
							<Text style={styles.quantityButtonText}>-</Text>
						</TouchableOpacity>
						<View style={styles.quantityValueWrapper}>
							<Text style={styles.quantityValue}>{removeAmount}</Text>
						</View>
						<TouchableOpacity
							style={[styles.quantityButton, styles.incrementButton]}
							onPress={handleIncrement}
							activeOpacity={0.7}
						>
							<Text style={[styles.quantityButtonText, styles.incrementButtonText]}>+</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.removeSection}>
					<TouchableOpacity onPress={handleRemove} activeOpacity={0.7}>
						<Text style={styles.removeLabel}>Remove from the cart</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.saveButton}
						onPress={handleSave}
						activeOpacity={0.8}
					>
						<Text style={styles.saveButtonText}>Save</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
};
