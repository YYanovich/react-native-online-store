import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION_KEYS } from '../../constants';
import { AuthStackParamList } from '../../types/screen-params.type';

import RegisterScreen from '../../../auth/screens/register/register.screen';
import LoginScreen from '../../../auth/screens/login/login.screen';
import VerificationScreen from '../../../auth/screens/verification/verification.screen';
import SuccessRegistrationScreen from '../../../auth/screens/successRegister/successRegistration.screen';
import ForgotPasswordScreen from '../../../auth/screens/forgotPassword/forgotPassword.screen';
import ResetVerificationScreen from '../../../auth/screens/resetVerification/resetVerification.screen';
import NewPasswordScreen from '../../../auth/screens/newPassword/newPassword.screen';
import SuccessResetPasswordScreen from '../../../auth/screens/successResetPassword/successResetPassword.screen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName={NAVIGATION_KEYS.LOGIN}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name={NAVIGATION_KEYS.LOGIN}
				component={LoginScreen}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.REGISTER}
				component={RegisterScreen}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.VERIFICATION}
				component={VerificationScreen}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.SUCCESS_REGISTRATION}
				component={SuccessRegistrationScreen}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.FORGOT_PASSWORD}
				component={ForgotPasswordScreen}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.RESET_PASSWORD_VERIFICATION}
				component={ResetVerificationScreen}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.NEW_PASSWORD}
				component={NewPasswordScreen}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.SUCCESS_RESET_PASSWORD}
				component={SuccessResetPasswordScreen}
			/>
		</Stack.Navigator>
	);
};
