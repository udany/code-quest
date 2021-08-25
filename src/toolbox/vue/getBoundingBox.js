import { getHtmlElementFromRef } from './useHtmlElement.js';
import { computed } from 'vue';

export function getBoundingBox(element) {
	let el = getHtmlElementFromRef(element);

	if (el?.getBoundingClientRect) {
		let bb = el.getBoundingClientRect();

		return {
			x: bb.x,
			y: bb.y,
			w: bb.width,
			h: bb.height,
		};
	}

	return null;
}

export function useBoundingBox(element) {
	return computed(() => getBoundingBox(element));
}