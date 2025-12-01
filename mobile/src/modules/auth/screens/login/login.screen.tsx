import { useState } from 'react';
import { Text, Image, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Layout } from '../../../../shared/componetnts/layout';
import Button from '../../../../shared/componetnts/button/button.component';
import { Input } from '../../../../shared/componetnts/input/input.component';
import { AuthStackParamList } from '../../../navigation/types/screen-params.type';
import { NAVIGATION_KEYS } from '../../../navigation/constants';
import { useAuthStore } from '../../../../shared/store/auth.store';
import { authApiService } from '../../../../shared/services/auth-api.service';
import Logo from '../../../../../assets/images/Logo.svg';
import { styles } from './login.screen.styles';

interface LoginFormData {
	email: string;
	password: string;
}

type LoginScreenNavigationProp = NativeStackNavigationProp<
	AuthStackParamList,
	typeof NAVIGATION_KEYS.LOGIN
>;

const loginValidation = yup.object().shape({
	email: yup.string().required('Email is required').email('Email is invalid'),
	password: yup.string().required('Password is required'),
});

export default function LoginScreen() {
	const navigation = useNavigation<LoginScreenNavigationProp>();
	const setAuth = useAuthStore((state) => state.setAuth);
	const setTokens = useAuthStore((state) => state.setTokens);

	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		setError,
		formState: { isValid, isDirty },
	} = useForm<LoginFormData>({
		resolver: yupResolver(loginValidation),
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true);

		try {
			const response = await authApiService.login({
				email: data.email,
				password: data.password,
			});

			if ('verificationRequired' in response) {
				navigation.navigate(NAVIGATION_KEYS.VERIFICATION, {
					email: data.email,
				});
			} else {
				const tokens = response;
				setTokens(tokens.access_token, tokens.refresh_token);
				const profile = await authApiService.profile();
				setAuth(
					{
						id: profile.id,
						email: profile.email,
						verified: profile.verified,
					},
					tokens.access_token,
					tokens.refresh_token,
				);
			}
		} catch (error: unknown) {
			setError('password', {
				type: 'server',
				message: 'Incorrect email or password',
			});
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Layout>
			<Logo style={styles.logo} />
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
				name="password"
				control={control}
				defaultValue=""
				label="Password"
				placeholder="Enter your password"
				isPassword
				autoCapitalize="none"
			/>
			<Text
				style={styles.forgotPasswordLink}
				onPress={() =>
					navigation.navigate(NAVIGATION_KEYS.FORGOT_PASSWORD)
				}
			>
				Forgot password ?
			</Text>
			<View style={styles.bottomWrapper}>
				<Button
					title="Sign in"
					onPress={handleSubmit(onSubmit)}
					style={styles.regButton}
					disabled={!isValid || !isDirty || isLoading}
				/>
				<Text style={styles.loginText}>
					Don't have an account?{' '}
					<Text
						style={styles.loginLink}
						onPress={() =>
							navigation.navigate(NAVIGATION_KEYS.REGISTER)
						}
					>
						Sign Up
					</Text>
				</Text>
			</View>
		</Layout>
	);
}
