import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

const ENV_KEY = 'EXPO_PUBLIC_API_URL';
const DEFAULT_PORT = 3030;

export const updateEnv = (ipAddress: string, port: number = DEFAULT_PORT): void => {
	if (!ipAddress) {
		throw new Error('IP address is required to update the environment file.');
	}

	const envPath = path.resolve(__dirname, '..', '.env');
	const value = `http://${ipAddress}:${port}`;

	let envContent = '';

	if (existsSync(envPath)) {
		envContent = readFileSync(envPath, 'utf8');
	}

	const lines = envContent
		.split(/\r?\n/)
		.filter((line) => line.trim().length > 0 && !line.trim().startsWith('#'));

	let hasKey = false;
	const nextLines = lines.map((line) => {
		if (line.startsWith(`${ENV_KEY}=`)) {
			hasKey = true;
			return `${ENV_KEY}=${value}`;
		}
		return line;
	});

	if (!hasKey) {
		nextLines.push(`${ENV_KEY}=${value}`);
	}

	const finalContent = `${nextLines.join('\n')}\n`;

	writeFileSync(envPath, finalContent, 'utf8');

	console.log(`Updated ${ENV_KEY} to ${value}`);
};

if (require.main === module) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { getLocalIp } = require('./get-local-ip') as { getLocalIp: () => string | null };

	const ip = getLocalIp();

	if (!ip) {
		console.error('Unable to determine local IP address. Ensure you are connected to the network.');
		process.exit(1);
	}

	try {
		updateEnv(ip);
	} catch (error) {
		console.error(error instanceof Error ? error.message : String(error));
		process.exit(1);
	}
}
