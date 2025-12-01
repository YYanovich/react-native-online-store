import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../shared/styles';

export const styles = StyleSheet.create({
	header: {
		paddingBottom: 16,
		paddingHorizontal: 16,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.primaryBackground,
	},
	title: {
		fontFamily: FONTS.poppinsBold,
		fontSize: 24,
		color: COLORS.black,
		textAlign: 'center',
	},
	filterBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 15,
		paddingHorizontal: 16,
		backgroundColor: COLORS.primaryBackground,
	},
	filterTitle: {
		fontFamily: FONTS.poppinsSemiBold,
		fontSize: 16,
		color: COLORS.black,
		paddingHorizontal: 16,
		paddingBottom: 16,
		backgroundColor: COLORS.primaryBackground,
	},
	filterLabel: {
		fontFamily: FONTS.poppinsSemiBold,
		fontSize: 16,
		color: COLORS.black,
	},
	filterValue: {
		fontFamily: FONTS.poppinsRegular,
		color: COLORS.success,
		textTransform: 'capitalize',
	},
	listContent: {
		paddingVertical: 2,
	},
	bottomSheet: {
		backgroundColor: COLORS.white,
		borderRadius: 24,
	},
	handleIndicator: {
		backgroundColor: COLORS.border,
	},
	filterContainer: {
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 0,
	},
	filterHeader: {
		fontFamily: FONTS.poppinsSemiBold,
		fontSize: 18,
		color: COLORS.black,
		marginBottom: 8,
	},
	filterOption: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 8,
	},
	filterText: {
		fontFamily: FONTS.poppinsRegular,
		fontSize: 18,
		color: COLORS.black,
	},
	filterCheck: {
		fontSize: 18,
		color: COLORS.success,
	},
	filterIcon: {
		width: 20,
		height: 20,
	},
	emptyContainer: {
		 flex: 1,
		 justifyContent: 'center',
		 alignItems: 'center' 
	},
	
});
