import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { styles } from './loadingFooter.component.styles';
import { COLORS } from '../../styles';

export const LoadingFooter: React.FC = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="small" color={COLORS.primary} />
		</View>
	);
};
