import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Layout } from '../../../../shared/componetnts/layout';
import Button from '../../../../shared/componetnts/button/button.component';
import { AuthStackParamList } from '../../../navigation/types/screen-params.type';
import { NAVIGATION_KEYS } from '../../../navigation/constants';
import { styles } from './successResetPassword.screen.styles';

import SuccessImg from '../../../../../assets/images/checkmark-circle.svg';

type SuccessResetPasswordScreenNavigationProp = NativeStackNavigationProp<
	AuthStackParamList,
	typeof NAVIGATION_KEYS.SUCCESS_RESET_PASSWORD
>;

export default function SuccessResetPasswordScreen() {
	const navigation = useNavigation<SuccessResetPasswordScreenNavigationProp>();

	return (
		<Layout withScroll={false}>
			<View style={styles.content}>
				<View style={styles.topContent}>
					<View style={styles.checkmarkContainer}>
						<SuccessImg style={styles.checkmark} />
					</View>

					<Text style={styles.message}>
						Password successfully reset!
					</Text>
				</View>

				<View style={styles.buttonWrapper}>
					<Button
						title="Sign In"
						onPress={() =>
							navigation.navigate(NAVIGATION_KEYS.LOGIN)
						}
					/>
				</View>
			</View>
		</Layout>
	);
}
