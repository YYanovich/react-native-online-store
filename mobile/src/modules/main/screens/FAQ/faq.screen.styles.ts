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
		paddingBottom: 20,
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
		paddingTop: 10,
	},
	accordionItem: {
		backgroundColor: COLORS.backgroundLight,
		marginBottom: 20,
		overflow: 'hidden',
	},
	accordionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 18,
	},
	accordionQuestion: {
		flex: 1,
		fontFamily: FONTS.poppinsSemiBold,
		fontSize: 16,
		color: COLORS.black,
		paddingRight: 10,
	},
	accordionIcon: {
		fontSize: 20,
		color: COLORS.black,
	},
	accordionContent: {
		overflow: 'hidden',
	},
	accordionAnswer: {
		fontFamily: FONTS.poppinsRegular,
		fontSize: 15,
		color: COLORS.black,
		lineHeight: 24,
		paddingHorizontal: 16,
		paddingBottom: 18,
	},
});
