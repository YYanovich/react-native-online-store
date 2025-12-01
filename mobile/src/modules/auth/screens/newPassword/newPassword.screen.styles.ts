import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/styles/colors';
import { FONTS } from '../../../../shared/styles/fonts';

export const styles = StyleSheet.create({
	content: {
		flex: 1,
                bottom: 50

	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
        top: 30,
    },
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
        top: 6,

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
		marginBottom: 40,
        marginTop: 10
	},
	bottomWrapper: {
		flex: 1,
		justifyContent: 'flex-end',
        top: 50
	},
});
