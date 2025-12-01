import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './orderCard.component.style';
import { Order } from '../../types/order.types';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface OrderCardProps {
  order: Order;
}

type RootParamList = { EditOrderScreen: { orderId: string } };
export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const formattedDate = new Date(order.createdAt).toLocaleDateString('uk-UA');

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('EditOrderScreen', { orderId: order.orderId })}
    >
      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{formattedDate}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>ID:</Text>
        <Text style={[styles.value, styles.idValue]} numberOfLines={1} ellipsizeMode="middle">
          {order.orderId}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Payment Status:</Text>
        <Text style={styles.value}>{order.paymentStatus}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Delivery Status:</Text>
        <Text style={styles.value}>{order.deliveryStatus}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total:</Text>
        <Text style={styles.value}>${order.totalAmount}</Text>
      </View>
    </TouchableOpacity>
  );
};
