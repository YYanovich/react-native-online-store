import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './orderItemCard.styles';
import BinIcon from '../../../../assets/images/Bin.svg';

export interface OrderItemCardProps {
  title: string;
  price: number;
  quantity: number;
  onRemove: () => void;
}

export const OrderItemCard: React.FC<OrderItemCardProps> = ({ title, price, quantity, onRemove }) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <TouchableOpacity onPress={onRemove} activeOpacity={0.8}>
          <BinIcon style={styles.binIcon}/>
        </TouchableOpacity>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Total:</Text>
        <Text style={styles.value}>${price.toFixed(0)}</Text>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>{quantity}</Text>
      </View>
    </View>
  );
};
