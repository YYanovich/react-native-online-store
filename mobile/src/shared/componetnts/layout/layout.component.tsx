import React, { ReactNode } from 'react';
import { SafeAreaView, View, ViewStyle, StyleProp } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './layout.styles';

interface LayoutProps {
	children: ReactNode;
	withScroll?: boolean;
	style?: StyleProp<ViewStyle>;
}

export function Layout({
	children,
	withScroll = true,
	style,
}: LayoutProps) {
	return (
		<SafeAreaView style={styles.safeArea}>
			{withScroll ? (
				<KeyboardAwareScrollView
					contentContainerStyle={[styles.scrollContent, style]}
					extraScrollHeight={20}
					enableOnAndroid={true}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					{children}
				</KeyboardAwareScrollView>
			) : (
				<View style={[styles.container, style]}>{children}</View>
			)}
		</SafeAreaView>
	);
}
