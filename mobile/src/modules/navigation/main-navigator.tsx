import { createStackNavigator } from '@react-navigation/stack';

export type MainStackParamList = {
  Products: undefined;
  ProductDetails: { productId: string };
  Cart: undefined;
  EditCart: { cartItemId: string };
  Orders: undefined;
};

export const MainStack = createStackNavigator<MainStackParamList>();
