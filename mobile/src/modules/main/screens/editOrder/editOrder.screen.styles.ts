import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../shared/styles';
import { act } from 'react';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 8,
  },
  backButton: {
    	width: 32,
		height: 32,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 16,
  },
  backIcon: {
    fontSize: 30,
		fontFamily: FONTS.interBold,
		color: COLORS.black,
		marginTop: -2,
  },
  title: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 23.5,
    color: COLORS.black,
  },
  editIcon: {
    padding: 8,
  },
  editIconText: {
    fontSize: 18,
    color: COLORS.black,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  totalLabel: {
    textAlign: 'center',
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: 16,
    color: COLORS.black,
    marginVertical: 12,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: 16,
    color: COLORS.black,
  },
  cardLabel: {
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: 14,
    color: COLORS.black,
  },
  cardValue: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 14,
    color: COLORS.black,
  },
  trash: {
    fontSize: 18,
    color: COLORS.error,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  payButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  payButtonText: {
    color: COLORS.white,
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: 16,
  },
  activityIndicator: {
     marginTop: 24 
  },
    payButtonIcon: {
      width: 20,
      height: 20,
    },
    editCartItemImg: {
      width: 20,
      height: 20,
    },
});
