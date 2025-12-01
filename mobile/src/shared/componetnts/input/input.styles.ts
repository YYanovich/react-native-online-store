import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';
import { FONTS } from '../../styles/fonts';

export const styles = StyleSheet.create({
	container: {
		marginBottom: 40,
	},
	label: {
		fontSize: 14,
		fontFamily: FONTS.interMedium,
		color: COLORS.textSecondary,
		marginBottom: 6,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.white,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLORS.border,
		paddingHorizontal: 16,
	},
	inputContainerFocused: {
		borderColor: COLORS.primary,
		borderWidth: 1,
	},
	eyeIcon: {
		width: 24,
		height: 24,
	},
	inputContainerError: {
		borderColor: COLORS.error,
	},
	input: {
		flex: 1,
		paddingVertical: 14,
		fontSize: 16,
		fontFamily: FONTS.poppinsRegular,
		color: COLORS.textPrimary,
	},
	eyeButton: {
		padding: 4,
	},
	focused: {
		borderWidth: 1,
	},
	wrong: {
		borderWidth: 1,
	},
	correct: {
		borderWidth: 1,
	},
});
