import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './emptyState.component.styles';

interface EmptyStateProps {
	message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.message}>{message}</Text>
		</View>
	);
};
