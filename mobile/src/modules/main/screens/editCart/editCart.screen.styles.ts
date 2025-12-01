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
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingTop: 60,
		paddingBottom: 20,
		backgroundColor: COLORS.primaryBackground,
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
	title: {
		fontSize: 20,
		fontFamily: FONTS.poppinsBold,
		color: COLORS.black,
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
	content: {
		flex: 1,
		paddingHorizontal: 20,
	},
	contentContainer: {
		paddingBottom: 40,
	},
	infoSection: {
		marginBottom: 24,
	},
	label: {
		fontSize: 16,
		fontFamily: FONTS.poppinsBold,
		color: COLORS.black,
		marginBottom: 8,
	},
	value: {
		fontSize: 16,
		fontFamily: FONTS.poppinsRegular,
		color: COLORS.black,
		lineHeight: 24,
	},
	quantityContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 18,
	},
	quantityButton: {
		width: 54,
		height: 54,
		borderRadius: 27,
		backgroundColor: COLORS.lightGray,
		alignItems: 'center',
		justifyContent: 'center',
	},
	incrementButton: {
		backgroundColor: COLORS.primary,
	},
	quantityButtonText: {
		fontSize: 26,
		fontFamily: FONTS.poppinsBold,
		color: COLORS.black,
	},
	incrementButtonText: {
		color: COLORS.white,
	},
	quantityValueWrapper: {
		width: 54,
		height: 54,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: COLORS.border,
		backgroundColor: COLORS.white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	quantityValue: {
		fontSize: 22,
		fontFamily: FONTS.poppinsBold,
		color: COLORS.black,
	},
	removeSection: {
		marginTop: 20,
		marginBottom: 32,
		alignItems: 'center',
	},
	removeLabel: {
		fontSize: 18,
		fontFamily: FONTS.poppinsBold,
		color: COLORS.error,
		textAlign: 'center',
	},
	buttonContainer: {
		paddingHorizontal: 20,
		paddingBottom: 32,
		marginTop: 12,
	},
	saveButton: {
		backgroundColor: COLORS.primary,
		borderRadius: 12,
		paddingVertical: 12,
		alignItems: 'center',
		top: 5,
	},
	saveButtonText: {
		fontSize: 18,
		fontFamily: FONTS.poppinsBold,
		color: COLORS.white,
	},
	errorText: {
		fontSize: 16,
		fontFamily: FONTS.poppinsRegular,
		color: COLORS.error,
		textAlign: 'center',
		marginTop: 40,
	},
});
