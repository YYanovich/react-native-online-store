import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../shared/styles';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.primaryBackground,
	},
	header: {
		flexDirection: 'row',
		paddingTop: 63,
		paddingBottom: 16,
		paddingHorizontal: 16,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: COLORS.primaryBackground,
	},
	headerLeft: {
		width: 40,
	},
	title: {
		fontFamily: FONTS.poppinsBold,
		fontSize: 24,
		color: COLORS.black,
		textAlign: 'center',
		flex: 1,
	},
	cartIconContainer: {
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	cartIcon: {
		width: 28,
		height: 28,
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
	searchSection: {
		padding: 16,
		backgroundColor: COLORS.primaryBackground,
	},
	searchInput: {
		height: 48,
		backgroundColor: COLORS.white,
		borderRadius: 12,
		paddingHorizontal: 16,
		fontSize: 16,
		color: COLORS.black,
	},
	sortButtons: {
		flexDirection: 'row',
		padding: 12,
		paddingTop: 0,
		gap: 8,
		backgroundColor: COLORS.primaryBackground,
	},
	sortButton: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 8,
		paddingHorizontal: 12,
		backgroundColor: COLORS.backgroundLight,
		borderRadius: 8,
		gap: 4,
	},
	sortButtonActive: {
		backgroundColor: COLORS.primary,
	},
	clearButton: {
		flex: 0.6,
	},
	sortIcon: {
		fontSize: 18,
		fontFamily: FONTS.poppinsBold	,
	},
	sortText: {
		fontSize: 12,
		fontFamily: FONTS.poppinsBold	,
	},
	listContent: {
		paddingVertical: 8,
		flexGrow: 1,
	},
	loadingOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: COLORS.white,
		justifyContent: 'center',
		alignItems: 'center',
	},
	paginationContainer: {
		backgroundColor: COLORS.primaryBackground,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderTopWidth: 1,
		borderColor: COLORS.border,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 24,
		backgroundColor: COLORS.primaryBackground,
	},
});
