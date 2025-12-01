import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../styles';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 12,
		paddingVertical: 18,
		paddingHorizontal: 20,
		marginHorizontal: 16,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: COLORS.border,
		backgroundColor: COLORS.primaryBackground,
		shadowColor: 'rgba(9, 16, 29, 0.08)',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 6,
		elevation: 1,
	},
	content: {
		flex: 1,
	},
	name: {
		fontFamily: FONTS.poppinsSemiBold,
		fontSize: 16,
		color: COLORS.black,
		flex: 1,
	},
	deleteButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 16,
		backgroundColor: 'transparent',
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: 28,
		marginTop: 12,
	},
	totalLabel: {
		fontFamily: FONTS.poppinsBold,
		fontSize: 16,
		color: COLORS.black,
	},
	totalValue: {
		fontFamily: FONTS.poppinsRegular,
		fontSize: 16,
		color: COLORS.black,
	},
	amountLabel: {
		fontFamily: FONTS.poppinsBold,
		fontSize: 16,
		color: COLORS.black,
	},
	amountValue: {
		fontFamily: FONTS.poppinsRegular,
		fontSize: 16,
		color: COLORS.black,
	},
    binIcon: {
         width: 24,
         height:24 
    }
});
