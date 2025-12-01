import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/styles/colors';
import { FONTS } from '../../../../shared/styles/fonts';

export const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	topContent: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	checkmarkContainer: {
		marginBottom: 24,
	},
	checkmark: {
		width: 100,
		height: 100,
	},
	message: {
		fontSize: 16,
		fontFamily: FONTS.poppinsRegular,
		color: COLORS.black,
		textAlign: 'center',
	},
	buttonWrapper: {
		width: '100%',
	},
});
