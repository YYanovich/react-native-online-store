import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles';

export const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: COLORS.primaryBackground,
	},
	scrollContent: {
		flexGrow: 1,
		paddingHorizontal: 20,
		paddingTop: 10,
	},
	container: {
		flex: 1,
		paddingHorizontal: 10,
	},
});
