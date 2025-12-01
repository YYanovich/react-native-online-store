import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage';

type User = {
	id: string;
	email: string;
	verified: boolean;
};

type AuthState = {
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;

	//actions
	setAuth: (user: User, accessToken: string, refreshToken: string) => void;
	setTokens: (accessToken: string, refreshToken: string) => void;
	clearAuth: () => void;
	updateUser: (user: Partial<User>) => void;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			accessToken: null,
			refreshToken: null,
			isAuthenticated: false,

			setAuth: (user, accessToken, refreshToken) =>
				set({
					user,
					accessToken,
					refreshToken,
					isAuthenticated: true,
				}),

			setTokens: (accessToken, refreshToken) =>
				set({
					accessToken,
					refreshToken,
				}),

			clearAuth: () =>
				set({
					user: null,
					accessToken: null,
					refreshToken: null,
					isAuthenticated: false,
				}),

			updateUser: (userData) =>
				set((state) => ({
					user: state.user ? { ...state.user, ...userData } : null,
				})),
		}),
		{
			name: STORAGE_KEYS.USER_DATA,
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
