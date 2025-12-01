import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

export const styles = StyleSheet.create({
	card: {
		backgroundColor: 'transparent',
		borderRadius: 10,
		padding: 16,
		marginHorizontal: 16,
		marginVertical: 6,
		borderWidth: 1,
		borderColor: COLORS.black,
		gap: 8,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	name: {
		flex: 1,
		fontSize: 16,
		fontWeight: '400',
		color: COLORS.textPrimary,
		marginRight: 8,
	},
	price: {
		fontSize: 16,
		color: COLORS.textPrimary,
	},
	priceLabel: {
		fontWeight: '700',
		color: COLORS.textPrimary,
	},
	category: {
		fontSize: 16,
		color: COLORS.textPrimary,
	},
	categoryLabel: {
		fontWeight: '700',
		color: COLORS.textPrimary,
	},
});
