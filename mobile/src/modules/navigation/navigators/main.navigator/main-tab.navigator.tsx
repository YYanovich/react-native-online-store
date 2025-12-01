import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../types/screen-params.type';
import { NAVIGATION_KEYS } from '../../constants';
import ProductsStackNavigator from '../products.navigator/products.navigator';
import OrdersScreen from '../../../main/screens/orders/orders.screen';
import SettingsScreen from '../../../main/screens/settings/settings.screen';
import { tabScreenOptions, styles } from './main-tab.navigator.styles';

import ProductsIcon from '../../../../../assets/images/Products.svg';
import OrdersIcon from '../../../../../assets/images/Orders.svg';
const SettingsPng = require('../../../../../assets/images/Settings.png');

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
	return (
		<Tab.Navigator screenOptions={tabScreenOptions}>
			<Tab.Screen
				name={NAVIGATION_KEYS.PRODUCTS}
				component={ProductsStackNavigator}
				options={{
					tabBarLabel: 'Products',
					tabBarIcon: ({ color }) => (
						<ProductsIcon width={24} height={24} color={color} fill={color} stroke={color} />
					),
				}}
			/>
			<Tab.Screen
				name={NAVIGATION_KEYS.ORDERS}
				component={OrdersScreen}
				options={{
					tabBarLabel: 'Orders',
					tabBarIcon: ({ color }) => (
						<OrdersIcon width={24} height={24} color={color} fill={color} stroke={color} />
					),
				}}
			/>
			<Tab.Screen
				name={NAVIGATION_KEYS.SETTINGS}
				component={SettingsScreen}
				options={{
					tabBarLabel: 'Settings',
					tabBarIcon: ({ color }) => (
						<Image
							source={SettingsPng}
							style={{ width: 24, height: 24, tintColor: color }}
							resizeMode="contain"
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}
