import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.primary,
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		flexDirection: 'row',
	},
	text: {
		color: COLORS.textButton,
		fontSize: 16,
		fontWeight: 'bold',
	},
	disabled: {
		backgroundColor: COLORS.disabled,
		opacity: 0.6,
	},
	textDisabled: {
		color: COLORS.textButton,
		opacity: 0.8,
	},
	iconSuccess: {
		marginRight: 8,
	},
});
