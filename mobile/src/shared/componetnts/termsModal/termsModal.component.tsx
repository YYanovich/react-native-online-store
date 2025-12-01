import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './termsModal.component.styles';

interface TermsModalProps {
	isVisible: boolean;
	onClose: () => void;
	url?: string;
}

export const TermsModal: React.FC<TermsModalProps> = ({
	isVisible,
	onClose,
	url = 'https://www.google.com',
}) => {
	const insets = useSafeAreaInsets();
	const [loading, setLoading] = useState(true);

	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={onClose}
			onBackButtonPress={onClose}
			style={styles.modalContainer}
			propagateSwipe
		>
			<View
				style={[
					styles.contentContainer,
					{
						paddingTop: insets.top,
						paddingBottom: insets.bottom,
					},
				]}
			>
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Terms & Conditions</Text>
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<Text style={styles.closeIcon}>✕</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.webViewContainer}>
					<WebView
						source={{ uri: url }}
						onLoadStart={() => setLoading(true)}
						onLoadEnd={() => setLoading(false)}
						style={styles.webView}
					/>
					{loading && (
						<View style={styles.loader}>
							<ActivityIndicator size="large" />
						</View>
					)}
				</View>
			</View>
		</Modal>
	);
};
