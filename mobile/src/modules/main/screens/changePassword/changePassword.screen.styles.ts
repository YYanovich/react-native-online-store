import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../shared/styles';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingTop: 60,
		paddingBottom: 20,
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
	backIcon: {
		fontSize: 32,
		color: COLORS.textPrimary,
		fontFamily: FONTS.interBold,
	},
	title: {
		fontSize: 24,
		fontFamily: FONTS.poppinsBold,
		color: COLORS.textPrimary,
        marginLeft: 25,
	},
	content: {
		flex: 1,
		paddingHorizontal: 20,
	},
	form: {
		paddingTop: 20,
	},
	inputContainer: {
		marginBottom: 40,
	},
	footer: {
		paddingHorizontal: 20,
		paddingBottom: 40,
		paddingTop: 20,
	},
	loader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
