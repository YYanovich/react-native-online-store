import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import {
	CodeField,
	Cursor,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Layout } from '../../../../shared/componetnts/layout';
import Button from '../../../../shared/componetnts/button/button.component';
import { AuthStackParamList } from '../../../navigation/types/screen-params.type';
import { NAVIGATION_KEYS } from '../../../navigation/constants';
import { styles } from './verification.screen.styles';
import { authApiService } from '../../../../shared/services/auth-api.service';

const CELL_COUNT = 4;

type VerificationScreenRouteProp = RouteProp<
	AuthStackParamList,
	typeof NAVIGATION_KEYS.VERIFICATION
>;

type VerificationScreenNavigationProp = NativeStackNavigationProp<
	AuthStackParamList,
	typeof NAVIGATION_KEYS.VERIFICATION
>;

export default function VerificationScreen() {
	const route = useRoute<VerificationScreenRouteProp>();
	const navigation = useNavigation<VerificationScreenNavigationProp>();

	const { email } = route.params;

	const [value, setValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	const isCodeComplete = value.length === CELL_COUNT;

	const onVerify = async () => {
		if (!isCodeComplete) return;

		setIsLoading(true);
		try {
			await authApiService.verify({ email, code: value });
			navigation.navigate(NAVIGATION_KEYS.SUCCESS_REGISTRATION);
		} catch (error: unknown) {
			Toast.show({
				type: 'error',
				text1: 'Verification failed',
				text2: 'Invalid code',
			});
			setValue('');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Layout>
			<View style={styles.content}>
				<View style={styles.topSection}>
					<Text style={styles.title}>Email Verification</Text>
					<Text style={styles.subtitle}>
						Please type the code from the email
					</Text>

					<CodeField
						{...props}
						value={value}
						onChangeText={setValue}
						cellCount={CELL_COUNT}
						rootStyle={styles.codeFieldRoot}
						keyboardType="number-pad"
						textContentType="oneTimeCode"
						InputComponent={TextInput}
						renderCell={({ index, symbol, isFocused }: { index: number; symbol: string; isFocused: boolean }) => (
							<View
								key={index}
								style={[
									styles.cell,
									isFocused && styles.focusCell,
								]}
								onLayout={getCellOnLayoutHandler(index)}
							>
								<Text style={styles.cellText}>
									{symbol || (isFocused ? <Cursor /> : null)}
								</Text>
							</View>
						)}
					/>
				</View>

				<View>
					<Button
						title={isLoading ? 'Verifying...' : 'Submit'}
						onPress={onVerify}
						disabled={!isCodeComplete || isLoading}
					/>
				</View>
			</View>
		</Layout>
	);
}
