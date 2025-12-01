import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../shared/styles';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: 16,
    color: COLORS.black,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
  },
  label: {
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: 14,
    color: COLORS.black,
  },
  value: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 14,
    color: COLORS.black,
    marginRight: 16,
  },
  binIcon: {
    width: 24,
    height: 24,
    top: 12,
  },
});
