import { watch, watchEffect } from 'vue';

export function useStyle({
	element,
	getStyle
}) {
	let requestId = null;
	let lastStyle = {};

	watchEffect(() => {
		if (requestId) {
			cancelAnimationFrame(requestId);
			requestId = null;
		}

		if (!element.value) return;

		let style = getStyle();

		requestId = requestAnimationFrame(() => {
			if (!element.value) return;

			for (let key of Object.keys(style)) {
				if (lastStyle[key] !== style[key])
					element.value.style.setProperty(key, style[key]);
			}

			lastStyle = style;
		});
	}, {
		flush: 'sync'
	});

	watch(() => element.value, (now, then) => {
		if (now !== then && then) {
			for (let key of Object.keys(lastStyle)) {
				then.style.removeProperty(key);
			}
		}
	})
}