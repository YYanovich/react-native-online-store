import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../shared/styles';

export const styles = StyleSheet.create({
	header: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontFamily: FONTS.poppinsBold,
		fontSize: 24,
		color: COLORS.black,
		textAlign: 'center',
	},
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 30,
	},
	menuItem: {
		paddingVertical: 20,
		borderBottomWidth: 0,
	},
	menuItemText: {
		fontFamily: FONTS.poppinsRegular,
		fontSize: 16,
		color: COLORS.black,
	},
	logoutItem: {
		paddingVertical: 20,
		marginTop: 10,
	},
	logoutText: {
		fontFamily: FONTS.poppinsRegular,
		fontSize: 16,
		color: COLORS.error,
	},
});
