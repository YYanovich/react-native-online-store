import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavContainer } from '../nav-container/nav-container.component';
import { AuthNavigator } from '../../navigators/auth.navigator/auth.navigator';
import MainTabNavigator from '../../navigators/main.navigator/main-tab.navigator';
import { useAuthStore } from '../../../../shared/store/auth.store';
import { NAVIGATION_KEYS } from '../../constants';
import { EditOrderScreen } from '../../../main/screens/editOrder/editOrder.screen';
import SuccessPaymentScreen from '../../../main/screens/successPayment/succcessPayment.screen';
import PersonalInfoScreen from '../../../main/screens/personalInfo';
import ChangePasswordScreen from '../../../main/screens/changePassword';
import FAQScreen from '../../../main/screens/FAQ';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	return (
		<NavContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{isAuthenticated ? (
					<>
						<Stack.Screen
							name={NAVIGATION_KEYS.MAIN_STACK}
							component={MainTabNavigator}
						/>
						<Stack.Screen
							name="EditOrderScreen"
							component={EditOrderScreen}
						/>
						<Stack.Screen
							name="SuccessPayment"
							component={SuccessPaymentScreen}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.PERSONAL_INFO}
							component={PersonalInfoScreen}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.CHANGE_PASSWORD}
							component={ChangePasswordScreen}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.FAQ}
							component={FAQScreen}
						/>
					</>
				) : (
					<Stack.Screen
						name={NAVIGATION_KEYS.AUTH_STACK}
						component={AuthNavigator}
					/>
				)}
			</Stack.Navigator>
		</NavContainer>
	);
};
