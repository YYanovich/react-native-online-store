import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../styles';

export const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		margin: 0,
		justifyContent: 'flex-end',

	},
	contentContainer: {
		flex: 1,
		backgroundColor: COLORS.white,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		overflow: 'hidden',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.border,
	},
	headerTitle: {
		fontFamily: FONTS.poppinsSemiBold,
		fontSize: 18,
		color: COLORS.black,
	},
	closeButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: COLORS.primaryBackground,
		alignItems: 'center',
		justifyContent: 'center',
	},
	closeIcon: {
		fontSize: 20,
		color: COLORS.black,
	    fontFamily: FONTS.interBold,
	},
	webViewContainer: {
		flex: 1,
	},
	loader: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.white,
	},
    webView: {
        flex: 1,
    },
});
