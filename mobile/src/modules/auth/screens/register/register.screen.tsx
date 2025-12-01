import { Text, View } from 'react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AxiosError } from 'axios';
import { Layout } from '../../../../shared/componetnts/layout';
import Button from '../../../../shared/componetnts/button/button.component';
import { Input } from '../../../../shared/componetnts/input';
import { AuthStackParamList } from '../../../navigation/types/screen-params.type';
import { NAVIGATION_KEYS } from '../../../navigation/constants';
import { styles } from './register.screen.syles';
import { authApiService } from '../../../../shared/services/auth-api.service';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface RegisterFormData {
	email: string;
	fullName: string;
	phone: string;
	shippingAddress: string;
	password: string;
	confirmPassword: string;
}

type RegisterScreenNavigationProp = NativeStackNavigationProp<
	AuthStackParamList,
	typeof NAVIGATION_KEYS.REGISTER
>;

const registerValidation = yup.object().shape({
	email: yup.string().required('Email is required').email('Email is invalid'),
	fullName: yup.string().required('Full name is required'),
	phone: yup.string().required('Phone number is required'),
	shippingAddress: yup.string().required('Shipping address is required'),
	password: yup
		.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters'),
	confirmPassword: yup
		.string()
		.required('Confirm password is required')
		.oneOf([yup.ref('password')], 'Passwords do not match'),
});

export default function RegisterScreen() {
	const navigation = useNavigation<RegisterScreenNavigationProp>();
	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { isValid, isDirty },
	} = useForm<RegisterFormData>({
		resolver: yupResolver(registerValidation),
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
			fullName: '',
			phone: '',
			shippingAddress: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: RegisterFormData) => {
		setIsLoading(true);
		try {
			await authApiService.register({ ...data });
			try {
				await authApiService.sendVerification(data.email);
			} catch (verificationError) {
				let verMessage = 'Failed to send verification code';
				if (verificationError instanceof AxiosError) {
					verMessage =
						verificationError.response?.data?.message || verMessage;
				}
			}
			navigation.navigate(NAVIGATION_KEYS.VERIFICATION, {
				email: data.email,
			});
		} catch (error: unknown) {
			console.log('Registration error:', error);

			let errorMessage = 'Registration failed. Please try again.';

			if (error instanceof AxiosError) {
				console.log('AxiosError details:', {
					status: error.response?.status,
					data: error.response?.data,
					message: error.message,
				});

				const status = error.response?.status;
				const message = error.response?.data?.message;

				if (status === 409) {
					errorMessage = 'This email is already registered';
				} else if (message) {
					errorMessage = message;
				}
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Layout>
			<Text style={styles.title}>Sign Up</Text>

			<Input
				name="email"
				control={control}
				defaultValue=""
				label="Email"
				placeholder="Enter your email"
				keyboardType="email-address"
				autoCapitalize="none"
			/>

			<Input
				name="fullName"
				control={control}
				defaultValue=""
				label="Full name"
				placeholder="Enter your full name"
				autoCapitalize="words"
			/>

			<Input
				name="phone"
				control={control}
				defaultValue=""
				label="Phone number"
				placeholder="+380 00 000 00 00"
				keyboardType="phone-pad"
			/>

			<Input
				name="shippingAddress"
				control={control}
				defaultValue=""
				label="Shipping address"
				placeholder="Enter your shipping address"
				autoCapitalize="words"
			/>

			<Input
				name="password"
				control={control}
				defaultValue=""
				label="Password"
				placeholder="Enter your password"
				isPassword
				autoCapitalize="none"
			/>

			<Input
				name="confirmPassword"
				control={control}
				defaultValue=""
				label="Confirm Password"
				placeholder="Confirm your password"
				isPassword
				autoCapitalize="none"
			/>

			<Button
				title={isLoading ? 'Signing up...' : 'Sign up'}
				onPress={handleSubmit(onSubmit)}
				style={styles.regButton}
				disabled={!isValid || !isDirty || isLoading}
			/>

			<Text style={styles.loginText}>
				Have you already registered?{' '}
				<Text
					style={styles.loginLink}
					onPress={() => navigation.navigate(NAVIGATION_KEYS.LOGIN)}
				>
					Sign In
				</Text>
			</Text>
		</Layout>
	);
}
