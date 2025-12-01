import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { COLORS, FONTS } from '../../styles';

interface ConfirmModalProps {
	isVisible: boolean;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
	confirmText?: string;
	cancelText?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
	isVisible,
	message,
	onConfirm,
	onCancel,
	confirmText = 'Yes',
	cancelText = 'No',
}) => {
	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={onCancel}
			backdropOpacity={0.5}
			animationIn="fadeIn"
			animationOut="fadeOut"
		>
			<View style={styles.container}>
				<Text style={styles.message}>{message}</Text>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
						<Text style={styles.cancelButtonText}>{cancelText}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
						<Text style={styles.confirmButtonText}>{confirmText}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.white,
		borderRadius: 16,
		padding: 24,
		alignItems: 'center',
	},
	message: {
		fontFamily: FONTS.poppinsRegular,
		fontSize: 16,
		color: COLORS.black,
		textAlign: 'center',
		marginBottom: 24,
	},
	buttonContainer: {
		flexDirection: 'row',
		gap: 16,
	},
	cancelButton: {
		backgroundColor: COLORS.warning,
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 32,
	},
	cancelButtonText: {
		fontFamily: FONTS.poppinsSemiBold,
		fontSize: 14,
		color: COLORS.white,
	},
	confirmButton: {
		backgroundColor: COLORS.primary,
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 32,
	},
	confirmButtonText: {
		fontFamily: FONTS.poppinsSemiBold,
		fontSize: 14,
		color: COLORS.white,
	},
});
