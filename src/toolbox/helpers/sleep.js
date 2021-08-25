export function sleep(time) {
	return new Promise((accept) => {
		setTimeout(accept, time);
	});
}