import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/styles/colors';

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
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		color: COLORS.black,
		marginBottom: 40,
		textAlign: 'center',
	},
	loginText: {
		textAlign: 'center',
		marginTop: 40,
		color: COLORS.black,
		fontSize: 16,
	},

	loginLink: {
		color: COLORS.primary,
		fontWeight: 'bold',
	},
	regButton: {
		marginTop: 10,
	},
});
