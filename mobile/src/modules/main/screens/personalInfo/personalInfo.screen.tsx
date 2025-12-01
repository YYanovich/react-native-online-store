import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { styles } from './personalInfo.screen.styles';
import { Input } from '../../../../shared/componetnts/input/input.component';
import Button from '../../../../shared/componetnts/button/button.component';
import { ConfirmModal } from '../../../../shared/componetnts/confirmModal';
import { userService } from '../../../../shared/services/user.service';
import { useAuthStore } from '../../../../shared/store/auth.store';

interface PersonalInfoFormData {
	email: string;
	fullName: string;
	phoneNumber: string;
	shippingAddress: string;
}

export default function PersonalInfoScreen() {
	const navigation = useNavigation();
	const clearAuth = useAuthStore((state) => state.clearAuth);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const { control, handleSubmit, reset } = useForm<PersonalInfoFormData>({
		defaultValues: {
			email: '',
			fullName: '',
			phoneNumber: '',
			shippingAddress: '',
		},
	});

	useEffect(() => {
		loadProfile();
	}, []);

	const loadProfile = async () => {
		try {
			setLoading(true);
			const profile = await userService.getProfile();
			reset({
				email: profile.email,
				fullName: profile.fullName || '',
				phoneNumber: profile.phoneNumber || '',
				shippingAddress: profile.shippingAddress || '',
			});
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Failed to load profile',
			});
		} finally {
			setLoading(false);
		}
	};

	const onSubmit = async (data: PersonalInfoFormData) => {
		try {
			setSaving(true);
			await userService.updateProfile({
				fullName: data.fullName,
				phoneNumber: data.phoneNumber,
				shippingAddress: data.shippingAddress,
			});
			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'Profile updated successfully',
			});
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Failed to update profile',
			});
		} finally {
			setSaving(false);
		}
	};

	const handleDeleteAccount = () => {
		setShowDeleteModal(true);
	};

	const confirmDeleteAccount = async () => {
		try {
			setDeleting(true);
			await userService.deleteAccount();
			setShowDeleteModal(false);
			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'Your account has been deleted',
			});
			clearAuth();
		} catch (error) {
			setDeleting(false);
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Failed to delete account',
			});
		}
	};

	if (loading) {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
						<Text style={styles.backIcon}>‹</Text>
					</TouchableOpacity>
					<Text style={styles.title}>Personal Info</Text>
				</View>
				<View style={styles.loader}>
					<ActivityIndicator size="large" />
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
					<Text style={styles.backIcon}>‹</Text>
				</TouchableOpacity>
				<Text style={styles.title}>Personal Info</Text>
			</View>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.form}>
					<Input
						name="email"
						control={control}
						defaultValue=""
						label="Email"
						placeholder="Email"
						editable={false}
						extraInputContainerStyles={styles.disabledInputContainer}
					/>

					<Input
						name="fullName"
						control={control}
						defaultValue=""
						label="Full name"
						placeholder="Enter your full name"
						extraInputContainerStyles={styles.inputContainer}
					/>

					<Input
						name="phoneNumber"
						control={control}
						defaultValue=""
						label="Phone number"
						placeholder="Enter your phone number"
						keyboardType="phone-pad"
						extraInputContainerStyles={styles.inputContainer}
					/>

					<Input
						name="shippingAddress"
						control={control}
						defaultValue=""
						label="Shipping address"
						placeholder="Enter your shipping address"
						extraInputContainerStyles={styles.inputContainer}
					/>

					<TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
						<Text style={styles.deleteButtonText}>Delete Account</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>

			<View style={styles.footer}>
				<Button
					title="Save"
					onPress={handleSubmit(onSubmit)}
					disabled={saving}
				/>
			</View>

			<ConfirmModal
				isVisible={showDeleteModal}
				message="Are you sure you want to delete your account?"
				onCancel={() => setShowDeleteModal(false)}
				onConfirm={confirmDeleteAccount}
			/>
		</View>
	);
}
