import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

import { RootNavigator } from '../navigation/components/root-navigator';
import { useFonts } from 'expo-font';
import {
	Poppins_400Regular,
	Poppins_600SemiBold,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_700Bold,
} from '@expo-google-fonts/inter';

export const App = () => {
	const [fontsLoaded] = useFonts({
		'Poppins-Regular': Poppins_400Regular,
		'Poppins-SemiBold': Poppins_600SemiBold,
		'Poppins-Bold': Poppins_700Bold,
		'Inter-Regular': Inter_400Regular,
		'Inter-Medium': Inter_500Medium,
		'Inter-Bold': Inter_700Bold,
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider>
				<RootNavigator />
				<Toast topOffset={60} />
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
};
