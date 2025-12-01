import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryBackground,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: 16,
    color: COLORS.black,
  },
  value: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  idValue: {
    flex: 1,
    textAlign: 'right',
  },
});
