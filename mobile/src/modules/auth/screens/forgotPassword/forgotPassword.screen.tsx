import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import { Layout } from '../../../../shared/componetnts/layout';
import Button from '../../../../shared/componetnts/button/button.component';
import { Input } from '../../../../shared/componetnts/input/input.component';
import { AuthStackParamList } from '../../../navigation/types/screen-params.type';
import { NAVIGATION_KEYS } from '../../../navigation/constants';
import { authApiService } from '../../../../shared/services/auth-api.service';
import { styles } from './forgotPassword.screen.styles';

interface ForgotPasswordFormData {
	email: string;
}

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
	AuthStackParamList,
	typeof NAVIGATION_KEYS.FORGOT_PASSWORD
>;

const forgotPasswordValidation = yup.object().shape({
	email: yup.string().required('Email is required').email('Email is invalid'),
});

export default function ForgotPasswordScreen() {
	const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { isValid, isDirty },
	} = useForm<ForgotPasswordFormData>({
		resolver: yupResolver(forgotPasswordValidation),
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
		},
	});

	const handleGoBack = () => {
		if (navigation.canGoBack()) {
			navigation.goBack();
		} else {
			navigation.navigate(NAVIGATION_KEYS.LOGIN);
		}
	};

	const onSubmit = async (data: ForgotPasswordFormData) => {
		setIsLoading(true);

		try {
			await authApiService.forgotPassword(data.email);
			navigation.navigate(NAVIGATION_KEYS.RESET_PASSWORD_VERIFICATION, {
				email: data.email,
			});
		} catch (error: unknown) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'User with this email does not exist',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Layout>
			<TouchableOpacity 
				style={styles.backButton} 
				onPress={handleGoBack}
				activeOpacity={0.6}
			>
				<Text style={styles.backIcon}>‹</Text>
			</TouchableOpacity>
			<View style={styles.content}>
				<Text style={styles.title}>Forgot Password</Text>
				<Text style={styles.subtitle}>
					Enter your email address to receive a verification code
				</Text>

				<Input
					name="email"
					control={control}
					defaultValue=""
					label="Email"
					placeholder="Enter your email"
					keyboardType="email-address"
					autoCapitalize="none"
				/>

				<View style={styles.bottomWrapper}>
					<Button
						title={isLoading ? 'Sending...' : 'Send Code'}
						onPress={handleSubmit(onSubmit)}
						disabled={!isValid || !isDirty || isLoading}
					/>
				</View>
			</View>
		</Layout>
	);
}
