import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/styles/colors';
import { FONTS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.primaryBackground,
	},
	scrollContent: {
		flexGrow: 1, 
		padding: 20,
		paddingTop: 25,
	},
	logo: {
		alignSelf: 'center',
		marginBottom: 20,
	},
	title: {
		fontSize: 16,
		fontFamily: FONTS.poppinsSemiBold,
		color: COLORS.black,
		marginBottom: 40,
		textAlign: 'center',
	},
	loginText: {
		textAlign: 'center',
		marginTop: 40,
		color: COLORS.black,
		fontSize: 16,
		fontFamily: FONTS.poppinsRegular,
	},
	bottomWrapper: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingBottom: 0, 
	},
	loginLink: {
		color: COLORS.primary,
		fontFamily: FONTS.poppinsSemiBold,
	},
	forgotPasswordLink: {
		color: COLORS.primary,
		fontFamily: FONTS.poppinsSemiBold,
		textAlign: 'center',
		marginTop: 8,
	},
	regButton: {
		marginTop: 10,
	},
});
