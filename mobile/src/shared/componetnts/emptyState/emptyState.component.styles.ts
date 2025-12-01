import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 60,
		paddingHorizontal: 20,
	},
	icon: {
		fontSize: 64,
		marginBottom: 16,
	},
	message: {
		fontSize: 16,
		color: COLORS.textSecondary,
		textAlign: 'center',
		lineHeight: 24,
	},
});
