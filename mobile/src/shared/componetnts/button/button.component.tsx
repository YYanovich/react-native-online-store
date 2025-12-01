import React from 'react';
import { Text, TouchableOpacity, StyleProp, ViewStyle, View } from 'react-native';
import { styles } from './button.styles';

interface ButtonProps {
	title: string;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
	disabled?: boolean;
	icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
	title,
	onPress,
	style,
	disabled = false,
	icon,
}) => {
	return (
		<TouchableOpacity
			style={[styles.container, disabled && styles.disabled, style]}
			onPress={onPress}
			disabled={disabled}
			activeOpacity={disabled ? 1 : 0.7}
		>
			{icon && <View style={styles.iconSuccess}>{icon}</View>}
			<Text style={[styles.text, disabled && styles.textDisabled]}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default Button;
