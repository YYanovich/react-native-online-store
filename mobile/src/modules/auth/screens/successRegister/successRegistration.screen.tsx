import React from 'react';
import { Text, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Layout } from '../../../../shared/componetnts/layout';
import Button from '../../../../shared/componetnts/button/button.component';
import { AuthStackParamList } from '../../../navigation/types/screen-params.type';
import { NAVIGATION_KEYS } from '../../../navigation/constants';
import { styles } from './successRegistration.screen.styles';

import SuccessRegisterImg from '../../../../../assets/images/checkmark-circle.svg';

type SuccessRegistrationScreenNavigationProp = NativeStackNavigationProp<
	AuthStackParamList,
	typeof NAVIGATION_KEYS.SUCCESS_REGISTRATION
>;

export default function SuccessRegistrationScreen() {
	const navigation = useNavigation<SuccessRegistrationScreenNavigationProp>();

	return (
		<Layout withScroll={false}>
			<View style={styles.content}>
				<View style={styles.topContent}>
					<View style={styles.checkmarkContainer}>
						<SuccessRegisterImg
							style={styles.checkmark}
						/>
					</View>

					<Text style={styles.message}>
						Account successfully registered!
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
