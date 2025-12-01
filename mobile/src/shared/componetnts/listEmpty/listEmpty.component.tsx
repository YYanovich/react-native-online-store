import React from 'react';
import { View } from 'react-native';
import { styles } from './listEmpty.component.styles';
import { EmptyState } from '../emptyState';

interface ListEmptyProps {
  message: string;
}

export const ListEmpty: React.FC<ListEmptyProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <EmptyState message={message} />
    </View>
  );
};
