import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/styles/colors';
import { FONTS } from '../../../../shared/styles/fonts';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.primaryBackground,
	},
	content: {
		flex: 1,
		padding: 20,
		paddingTop: 40,
	},
	topSection: {
		flex: 1,
	},
	title: {
		fontSize: 16,
		fontFamily: FONTS.interBold,
		color: COLORS.black,
		marginBottom: 40,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 14,
		fontFamily: FONTS.interMedium,
		color: COLORS.gray,
		textAlign: 'center',
		marginBottom: 49,
	},
	codeFieldRoot: {
		paddingHorizontal: 60,
	},
	cell: {
		width: 44,
		height: 50,
		lineHeight: 58,
		fontSize: 24,
		borderWidth: 1,
		borderColor: COLORS.border,
		borderRadius: 10,
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.white,
	},
	focusCell: {
		borderColor: COLORS.primary,
		borderWidth: 2,
	},
	cellText: {
		fontSize: 24,
		fontFamily: FONTS.poppinsBold,
		color: COLORS.black,
		textAlign: 'center',
	},
	scrollContent: {
		flexGrow: 1, 
	},
});
