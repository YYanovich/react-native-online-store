import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/styles/colors';

export const navigatorOptions = {
	cardStyle: { backgroundColor: COLORS.primaryBackground },
	headerStyle: { backgroundColor: COLORS.primaryBackground },
};

export const navStyles = StyleSheet.create({
	header: {
		paddingTop: 50,
		paddingBottom: 16,
		paddingHorizontal: 16,
		backgroundColor: COLORS.primaryBackground,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	backButton: {
		width: 32,
		height: 32,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 16,
	},
	backIcon: {
		fontSize: 28,
		fontWeight: '700',
		color: COLORS.black,
		marginTop: -2,
	},
	titleCentered: {
		width: 32,
		height: 32,
	},
	title: {
		flex: 1,
		textAlign: 'center',
		fontSize: 24,
		fontWeight: '700',
		color: COLORS.black,
	},
});
