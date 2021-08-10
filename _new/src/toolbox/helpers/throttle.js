export default function throttle(fn, minTimeout) {
	let timeout = null;
	let lastFired = 0;

	return (...args) => {
		if (timeout) clearTimeout(timeout);

		let t = (lastFired + minTimeout) - Date.now();

		timeout = setTimeout(() => {
			fn(...args);
			timeout = null;
			lastFired = Date.now();
		}, Math.max(t, 0));
	}
}