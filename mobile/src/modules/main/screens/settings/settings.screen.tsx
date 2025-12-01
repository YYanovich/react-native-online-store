import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Layout } from '../../../../shared/componetnts/layout';
import { TermsModal } from '../../../../shared/componetnts/termsModal';
import { useAuthStore } from '../../../../shared/store/auth.store';
import { authApiService } from '../../../../shared/services/auth-api.service';
import { AxiosError } from 'axios';
import { styles } from './settings.screen.styles';
import { NAVIGATION_KEYS } from '../../../navigation/constants';

export default function SettingsScreen() {
	const navigation = useNavigation();
	const clearAuth = useAuthStore((state) => state.clearAuth);
	const accessToken = useAuthStore((state) => state.accessToken);
	const [showTermsModal, setShowTermsModal] = useState(false);

	const handleLogout = async () => {
		if (!accessToken) {
			clearAuth();
			return;
		}
		try {
			await authApiService.logout();
		} catch (error: unknown) {
			let msg = 'Logout failed';
			if (error instanceof AxiosError) {
				msg = error.response?.data?.message || error.message || msg;
			}
		} finally {
			clearAuth();
		}
	};

	return (
		<Layout withScroll={false}>
			<View style={styles.header}>
				<Text style={styles.title}>Settings</Text>
			</View>
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.menuItem}
					onPress={() => navigation.navigate(NAVIGATION_KEYS.PERSONAL_INFO as never)}
				>
					<Text style={styles.menuItemText}>Personal info</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.menuItem}
					onPress={() => navigation.navigate(NAVIGATION_KEYS.CHANGE_PASSWORD as never)}
				>
					<Text style={styles.menuItemText}>Change password</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.menuItem}
					onPress={() => navigation.navigate(NAVIGATION_KEYS.FAQ as never)}
				>
					<Text style={styles.menuItemText}>FAQ</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.menuItem}
					onPress={() => setShowTermsModal(true)}
				>
					<Text style={styles.menuItemText}>Terms & Conditions</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.logoutItem}
					onPress={handleLogout}
				>
					<Text style={styles.logoutText}>Logout</Text>
				</TouchableOpacity>
			</View>

			<TermsModal
				isVisible={showTermsModal}
				onClose={() => setShowTermsModal(false)}
				url="https://www.google.com"
			/>
		</Layout>
	);
}
