import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/styles/colors';
import { FONTS } from '../../../../shared/styles/fonts';

export const styles = StyleSheet.create({
	content: {
		flex: 1,
		marginBottom: 20,
	},
	backButton: {
		position: 'absolute',
		left: 0,
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 100,
	},
	backIcon: {
		fontSize: 32,
		color: COLORS.black,
		fontFamily: FONTS.interBold,
	},
	title: {
		fontSize: 24,
		fontFamily: FONTS.poppinsBold,
		color: COLORS.black,
		marginBottom: 16,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 14,
		fontFamily: FONTS.interMedium,
		color: COLORS.gray,
		textAlign: 'center',
		marginBottom: 15,
        marginTop: 10
	},
	bottomWrapper: {
		flex: 1,
		justifyContent: 'flex-end',
	},
});
