import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Layout } from '../../../../shared/componetnts/layout';
import Button from '../../../../shared/componetnts/button/button.component';
import { NAVIGATION_KEYS } from '../../../navigation/constants';
import { styles } from './succcessPayment.screen.styles';
import SuccessRegisterImg from '../../../../../assets/images/checkmark-circle.svg';
import SuccessPaymentIcon from '../../../../../assets/images/successPayment.svg';

export default function SuccessPaymentScreen() {
	const navigation = useNavigation();

	return (
		<Layout withScroll={false}>
			<View style={styles.content}>
				<View style={styles.topContent}>
					<View style={styles.checkmarkContainer}>
						<SuccessRegisterImg style={styles.checkmark} />
					</View>

					<Text style={styles.message}>Payment successful!</Text>
				</View>

				<View style={styles.buttonWrapper}>
					<Button
						title="Ok"
						onPress={() => navigation.dispatch(CommonActions.navigate(NAVIGATION_KEYS.MAIN_STACK))}
						icon={<SuccessPaymentIcon style={styles.iconSuccess} />}
					/>
				</View>
			</View>
		</Layout>
	);
}