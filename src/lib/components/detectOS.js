function detectOS() {
	const platform = navigator.platform.toLowerCase(),
			iosPlatforms = ['iphone', 'ipad', 'ipod', 'ipod touch'];

	if (platform.includes('mac')) return 'MacOS';
	if (iosPlatforms.includes(platform)) return 'iOS';
	if (platform.includes('win')) return 'Windows';
	if (/android/.test(navigator.userAgent.toLowerCase())) return 'Android';
	if (/linux/.test(platform)) return 'Linux';

	return 'unknown';
}