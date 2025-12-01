import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/styles/colors';
import { FONTS } from '../../../../shared/styles/fonts';
export const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: COLORS.primaryBackground,
	},
	header: {
		paddingTop: 65,
		paddingBottom: 16,
		paddingHorizontal: 16,
		backgroundColor: COLORS.primaryBackground,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	backButton: {
		width: 32,
		height: 32,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 16,
	},
	backIcon: {
		fontSize: 30,
		fontFamily: FONTS.interBold,
		color: COLORS.black,
		marginTop: -2,
	},
	titleCentered: {
		width: 32,
		height: 32,
	},
	title: {
		flex: 1,
		textAlign: 'center',
		fontSize: 24,
		fontFamily: FONTS.poppinsBold,
		color: COLORS.black,
	},
	container: {
		flex: 1,
	},
	content: {
		padding: 20,
		gap: 8,
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.primaryBackground,
	},
	errorText: {
		fontSize: 16,
		color: COLORS.textSecondary,
	},
	label: {
		fontSize: 16,
		fontFamily: FONTS.poppinsBold,
		color: COLORS.textPrimary,
		marginTop: 8,
	},
	value: {
		fontSize: 16,
		fontFamily: FONTS.poppinsRegular,
		color: COLORS.textPrimary,
	},
	description: {
		fontSize: 16,
		fontFamily: FONTS.poppinsRegular,
		color: COLORS.textPrimary,
		lineHeight: 24,
	},
	buttonContainer: {
		padding: 16,
		backgroundColor: COLORS.primaryBackground,
	},
	addButton: {
		backgroundColor: COLORS.primary,
		borderRadius: 12,
		paddingVertical: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		color: COLORS.white,
		fontSize: 18,
		fontFamily: FONTS.poppinsBold,
	},
	cartIconContainer: {
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	badge: {
		position: 'absolute',
		top: 0,
		right: 0,
		backgroundColor: COLORS.error,
		borderRadius: 10,
		minWidth: 20,
		height: 20,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 5,
	},
	badgeText: {
		color: COLORS.white,
		fontSize: 12,
		fontFamily: FONTS.poppinsBold,
	},
	amountContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 18,
		marginVertical: 16,
	},
	amountButton: {
		width: 54,
		height: 54,
		borderRadius: 27,
		backgroundColor: COLORS.lightGray,
		alignItems: 'center',
		justifyContent: 'center',
	},
	amountButtonIncrement: {
		backgroundColor: COLORS.primary,
	},
	amountButtonText: {
		fontSize: 26,
		fontFamily: FONTS.poppinsBold,
		color: COLORS.black,
	},
	amountButtonIncrementText: {
		color: COLORS.white,
	},
	amountValueWrapper: {
		width: 54,
		height: 54,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: COLORS.border,
		backgroundColor: COLORS.white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	amountValue: {
		fontSize: 22,
		fontFamily: FONTS.poppinsBold,
		color: COLORS.black,
	},
});
