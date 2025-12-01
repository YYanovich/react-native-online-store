import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, useWatch } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { styles } from './changePassword.screen.styles';
import { Input } from '../../../../shared/componetnts/input/input.component';
import Button from '../../../../shared/componetnts/button/button.component';
import { userService } from '../../../../shared/services/user.service';

interface ChangePasswordFormData {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export default function ChangePasswordScreen() {
	const navigation = useNavigation();
	const [saving, setSaving] = useState(false);

	const { control, handleSubmit, reset, formState: { errors } } = useForm<ChangePasswordFormData>({
		mode: 'onChange',
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
	});

	const newPassword = useWatch({ control, name: 'newPassword' });

	const onSubmit = async (data: ChangePasswordFormData) => {
		try {
			setSaving(true);
			await userService.changePassword({
				oldPassword: data.currentPassword,
				newPassword: data.newPassword,
				confirmPassword: data.confirmPassword,
			});
			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'Password changed successfully',
			});
			reset();
			navigation.goBack();
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Failed to change password',
			});
		} finally {
			setSaving(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
					<Text style={styles.backIcon}>‹</Text>
				</TouchableOpacity>
				<Text style={styles.title}>Change Password</Text>
			</View>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.form}>
					<Input
						name="currentPassword"
						control={control}
						defaultValue=""
						label="Current Password"
						placeholder="Enter current password"
						extraInputContainerStyles={styles.inputContainer}
						rules={{ required: 'Current password is required' }}
					/>

					<Input
						name="newPassword"
						control={control}
						defaultValue=""
						label="New Password"
						placeholder="Enter new password"
						isPassword
						extraInputContainerStyles={styles.inputContainer}
						rules={{
							required: 'New password is required',
							minLength: {
								value: 8,
								message: 'Password must be at least 8 characters',
							},
						}}
					/>

					<Input
						name="confirmPassword"
						control={control}
						defaultValue=""
						label="Confirm New Password"
						placeholder="Confirm new password"
						isPassword
						extraInputContainerStyles={styles.inputContainer}
						rules={{
							required: 'Confirm password is required',
							validate: (value: string) =>
								value === newPassword || 'Passwords should match',
						}}
					/>
				</View>
			</ScrollView>

			<View style={styles.footer}>
				<Button
					title="Save"
					onPress={handleSubmit(onSubmit)}
					disabled={saving}
				/>
			</View>
		</View>
	);
}
