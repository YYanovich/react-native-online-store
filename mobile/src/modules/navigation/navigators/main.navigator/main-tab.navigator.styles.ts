import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/styles/colors';
import { FONTS } from '../../../../shared/styles/fonts';

export const tabScreenOptions = {
	headerShown: false,
	tabBarActiveTintColor: COLORS.primary,
	tabBarInactiveTintColor: COLORS.black,
	tabBarStyle: {
		backgroundColor: COLORS.white,
		paddingTop: 3,
	},
	tabBarLabelStyle: {
		fontSize: 16,
		fontFamily: FONTS.poppinsRegular,
		marginTop: 10,
	},
	tabBarIconStyle: {
		marginTop: 2,
	},
};

export const styles = StyleSheet.create({
	tabIcon: {
		width: 24,
		height: 24,
	},
});
