import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { NativeModules } from 'react-native';
import Constants from 'expo-constants';
import { useAuthStore } from '../store/auth.store';

type SourceCodeModule = {
	scriptURL?: string;
};

const DEFAULT_PORT = 3030;
const FALLBACK_URL = process.env.EXPO_PUBLIC_API_URL || `http://127.0.0.1:${DEFAULT_PORT}`;

const extractHostFromUrl = (url?: string): string | undefined => {
	if (!url) {
		return undefined;
	}

	const sanitized = url.replace(/^(https?:|exp):\/\//, '').split('?')[0];
	const [host] = sanitized.split(':');

	if (!host) {
		return undefined;
	}

	const isIpv4 = /^\d{1,3}(?:\.\d{1,3}){3}$/.test(host);
	const isHostname = host !== 'localhost' && host !== '127.0.0.1';

	if (isIpv4 || isHostname) {
		return host;
	}

	return undefined;
};

const deriveLanUrl = (): string | undefined => {
	if (!__DEV__) {
		return undefined;
	}

	const sourceCodeModule = NativeModules?.SourceCode as SourceCodeModule | undefined;
	const expoConfig = Constants.expoConfig as { hostUri?: string; debuggerHost?: string } | undefined;
	const manifestLegacy = (Constants as unknown as { manifest?: { debuggerHost?: string } }).manifest;
	const manifestNew = (Constants as unknown as {
		manifest2?: { extra?: { expoGo?: { developer?: { host?: string } } } };
	}).manifest2;

	const hostCandidates = [
		sourceCodeModule?.scriptURL,
		expoConfig?.hostUri,
		expoConfig?.debuggerHost,
		manifestLegacy?.debuggerHost,
		manifestNew?.extra?.expoGo?.developer?.host,
	];

	for (const candidate of hostCandidates) {
		const host = extractHostFromUrl(candidate);
		if (host) {
			return `http://${host}:${DEFAULT_PORT}`;
		}
	}

	return undefined;
};

const BASE_URL = deriveLanUrl() ?? FALLBACK_URL;

export const mainAxios = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

mainAxios.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const accessToken = useAuthStore.getState().accessToken;
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

mainAxios.interceptors.response.use(
	(response): AxiosResponse<unknown, unknown> => {
		return response;
	},
	async (error) => {
		if (Boolean(error.response) && error.response.status === 401) {
		}
		return Promise.reject(error);
	},
);
