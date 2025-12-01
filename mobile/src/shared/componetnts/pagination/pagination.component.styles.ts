import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../styles';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 20,
		paddingHorizontal: 16,
		gap: 8,
	},
	navButton: {
		width: 40,
		height: 40,
		borderRadius: 8,
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: COLORS.border,
		justifyContent: 'center',
		alignItems: 'center',
	},
	navText: {
		fontSize: 18,
		color: COLORS.textPrimary,
		fontFamily: FONTS.poppinsSemiBold,
	},
	pageButton: {
		width: 40,
		height: 40,
		borderRadius: 8,
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: COLORS.border,
		justifyContent: 'center',
		alignItems: 'center',
	},
	activeButton: {
		backgroundColor: COLORS.primary,
		borderColor: COLORS.primary,
	},
	pageText: {
		fontSize: 14,
		color: COLORS.textPrimary,
		fontWeight: '600',
	},
	activeText: {
		color: COLORS.white,
	},
	disabled: {
		opacity: 0.3,
	},
	dots: {
		fontSize: 14,
		color: COLORS.textSecondary,
		paddingHorizontal: 4,
	},
});
