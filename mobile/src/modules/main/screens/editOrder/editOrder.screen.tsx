import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { styles } from './editOrder.screen.styles';
import PayIcon from '../../../../../assets/images/Pay.svg';
import { ordersService } from '../../../../shared/services/orders.service';
import { paymentsService } from '../../../../shared/services/payments.service';
import { OrderWithDetails } from '../../../../shared/types/order.types';
import { ProductService } from '../../../../shared/services/product.service';
import { OrderItemCard } from '../../../../shared/componetnts/orderEdit/orderItemCard.component';
import EditCartItemImg from '../../../../../assets/images/editCartItemimg.svg';
import { NAVIGATION_KEYS } from '../../../navigation/constants';
import { ProductsStackParamList } from '../../../navigation/types/screen-params.type';

type EditOrderNavigationProp = NavigationProp<ProductsStackParamList, 'EditOrderScreen'>;
type EditOrderRouteProp = RouteProp<ProductsStackParamList, 'EditOrderScreen'>;

export const EditOrderScreen: React.FC = () => {
  const navigation = useNavigation<EditOrderNavigationProp>();
  const route = useRoute<EditOrderRouteProp>();
  const { orderId } = route.params;

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderWithDetails | null>(null);
  const [items, setItems] = useState<Array<{ id: string; name: string; price: number; quantity: number }>>([]);

  const totalAmount = useMemo(() => items.reduce((sum, it) => sum + it.price * it.quantity, 0), [items]);

  const load = async () => {
    setLoading(true);
    try {
      const data = await ordersService.getOrderById(orderId);
      setOrder(data);
      // fetch product names for each detail
      const withNames = await Promise.all(
        data.details.map(async (d) => {
          try {
            const product = await ProductService.getProductById(d.productId);
            return { id: d.orderDetailId, name: product.name, price: Number(d.priceAtPurchase), quantity: d.quantity };
          } catch {
            return { id: d.orderDetailId, name: d.productId, price: Number(d.priceAtPurchase), quantity: d.quantity };
          }
        }),
      );
      setItems(withNames);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      load();
    }
  }, [orderId]);

  const handleRemoveItem = async (id: string) => {
    if (!order) return;
    await ordersService.removeItem(order.orderId, id);
    await load();
  };

  const handlePay = async () => {
    if (!order) return;
    try {
      const payment = await paymentsService.createPayment(order.orderId);
      if (payment.paymentStatus === 'SUCCESS') {
        navigation.navigate(NAVIGATION_KEYS.SUCCESS_PAYMENT);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Payment Failed',
          text2: 'Please try again.',
        });
      }
    } catch (error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const msg = axiosError.response?.data?.message || '';
      if (msg.includes('already exists')) {
        navigation.navigate(NAVIGATION_KEYS.SUCCESS_PAYMENT);
        return;
      }
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: msg || 'Unable to process payment.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Order details</Text>
        <TouchableOpacity style={styles.editIcon} activeOpacity={0.7}>
          <EditCartItemImg style={styles.editCartItemImg}/>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator style={styles.activityIndicator} size="large" />
      ) : (
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.totalLabel}>Total amount: ${totalAmount.toFixed(2)}</Text>

          {items.map((item) => (
            <OrderItemCard
              key={item.id}
              title={item.name}
              price={item.price}
              quantity={item.quantity}
              onRemove={() => handleRemoveItem(item.id)}
            />
          ))}
        </ScrollView>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.payButton} onPress={handlePay} activeOpacity={0.85}>
          <PayIcon style={styles.payButtonIcon} />
          <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
