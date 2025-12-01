import os from 'os';

export const getLocalIp = (): string | null => {
	const networkInterfaces = os.networkInterfaces();

	for (const ifaceList of Object.values(networkInterfaces)) {
		if (!ifaceList) continue;

		for (const iface of ifaceList) {
			if (!iface) continue;
			if (iface.family === 'IPv4' && !iface.internal) {
				return iface.address;
			}
		}
	}

	return null;
};

if (require.main === module) {
	const ip = getLocalIp();

	if (!ip) {
		console.error('Unable to determine local IP address.');
		process.exit(1);
	}

	process.stdout.write(ip);
}
