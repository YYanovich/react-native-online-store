import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductsStackParamList } from '../../types/screen-params.type';
import { ProductsScreen } from '../../../main/screens/products/products.screen';
import { ProductDetailsScreen } from '../../../main/screens/productDetails/productDetails.screen';
import { CartScreen } from '../../../main/screens/cart/cart.screen';
import { EditCartScreen } from '../../../main/screens/editCart/editCart.screen';
import { EditOrderScreen } from '../../../main/screens/editOrder/editOrder.screen';
import SuccessPaymentScreen from '../../../main/screens/successPayment/succcessPayment.screen';
import { COLORS } from '../../../../shared/styles';
import { navigatorOptions } from './products.style';

const Stack = createStackNavigator<ProductsStackParamList>();

export default function ProductsStackNavigator() {
	return (
		<Stack.Navigator screenOptions={navigatorOptions}>
			<Stack.Screen
				name="ProductsList"
				component={ProductsScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="ProductDetails"
				component={ProductDetailsScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="CartScreen"
				component={CartScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="EditCartScreen"
				component={EditCartScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="EditOrderScreen"
				component={EditOrderScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="SuccessPayment"
				component={SuccessPaymentScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
