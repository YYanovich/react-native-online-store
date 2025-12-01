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
	totalContainer: {
		paddingVertical: 12,
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	totalCombined: {
		fontSize: 16,
		fontFamily: FONTS.poppinsBold,
		color: COLORS.black,
	},
	list: {
		flex: 1,
	},
	listContent: {
		paddingVertical: 8,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 60,
	},
	emptyText: {
		fontSize: 16,
		fontFamily: FONTS.poppinsRegular,
		color: COLORS.textSecondary,
	},
	buttonContainer: {
		paddingHorizontal: 20,
		paddingVertical: 24,
		backgroundColor: 'transparent',
	},
	createOrderButton: {
		backgroundColor: COLORS.primary,
		borderRadius: 12,
		paddingVertical: 12,
		alignItems: 'center',
		top: 5
	},
	createOrderButtonText: {
		fontSize: 18,
		fontFamily: FONTS.poppinsBold,
		color: COLORS.white,
	},
	cartIcon: {
		width:28,
		height: 28
	}
});
