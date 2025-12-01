import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../shared/styles';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.primaryBackground,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
		paddingTop: 60,
		paddingBottom: 8,
		position: 'relative',
	},
	backButton: {
		position: 'absolute',
		left: 16,
		top: 60,
		width: 32,
		height: 32,
		alignItems: 'center',
		justifyContent: 'center',
	},
	backIcon: {
		fontSize: 30,
		fontFamily: FONTS.interBold,
		color: COLORS.black,
		marginTop: -2,
	},
	title: {
		fontFamily: FONTS.poppinsBold,
		fontSize: 24,
		color: COLORS.black,
	},
	content: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 20,
	},
	form: {
		flex: 1,
	},
	inputContainer: {
		marginBottom: 40,
	},
	disabledInputContainer: {
		marginBottom: 40,
		opacity: 0.6,
	},
	deleteButton: {
		alignItems: 'center',
		paddingVertical: 20,
		marginTop: 20,
	},
	deleteButtonText: {
		fontFamily: FONTS.poppinsSemiBold,
		fontSize: 16,
		color: COLORS.error,
	},
	footer: {
		paddingHorizontal: 16,
		paddingBottom: 30,
	},
	loader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
