import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
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
import { styles } from './newPassword.screen.styles';

interface NewPasswordFormData {
	newPassword: string;
	confirmPassword: string;
}

type NewPasswordScreenRouteProp = RouteProp<
	AuthStackParamList,
	typeof NAVIGATION_KEYS.NEW_PASSWORD
>;

type NewPasswordScreenNavigationProp = NativeStackNavigationProp<
	AuthStackParamList,
	typeof NAVIGATION_KEYS.NEW_PASSWORD
>;

const newPasswordValidation = yup.object().shape({
	newPassword: yup
		.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters'),
	confirmPassword: yup
		.string()
		.required('Confirm password is required')
		.oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

export default function NewPasswordScreen() {
	const route = useRoute<NewPasswordScreenRouteProp>();
	const navigation = useNavigation<NewPasswordScreenNavigationProp>();
	const { email, code } = route.params;

	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { isValid, isDirty },
	} = useForm<NewPasswordFormData>({
		resolver: yupResolver(newPasswordValidation),
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: {
			newPassword: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: NewPasswordFormData) => {
		setIsLoading(true);

		try {
			await authApiService.resetPassword({
				email,
				code,
				newPassword: data.newPassword,
				confirmPassword: data.confirmPassword,
			});
			navigation.navigate(NAVIGATION_KEYS.SUCCESS_RESET_PASSWORD);
		} catch (error: unknown) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Failed to reset password. Please try again.',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Layout>
			<View style={styles.content}>
				<View style={styles.header}>
					<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
						<Text style={styles.backIcon}>‹</Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.title}>Create New Password</Text>
				<Text style={styles.subtitle}>
					Please enter your new password
				</Text>

				<Input
					name="newPassword"
					control={control}
					defaultValue=""
					label="New Password"
					placeholder="Enter new password"
					isPassword
					autoCapitalize="none"
				/>

				<Input
					name="confirmPassword"
					control={control}
					defaultValue=""
					label="Confirm Password"
					placeholder="Confirm new password"
					isPassword
					autoCapitalize="none"
				/>

				<View style={styles.bottomWrapper}>
					<Button
						title={isLoading ? 'Resetting...' : 'Reset Password'}
						onPress={handleSubmit(onSubmit)}
						disabled={!isValid || !isDirty || isLoading}
					/>
				</View>
			</View>
		</Layout>
	);
}
