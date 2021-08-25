import { computed } from 'vue';

export function getHtmlElementFromRef(elementRef) {
	if (!elementRef) return null;
	if (elementRef instanceof HTMLElement) return elementRef;

	let el = elementRef.value || elementRef;
	el = el.$el || el;

	if (!(el instanceof HTMLElement)) return null;

	return el;
}

export function useHtmlElement(elementRef) {
	return computed(() => getHtmlElementFromRef(elementRef));
}

export function elementBelongsTo(element, parent) {
	let el = getHtmlElementFromRef(element);
	parent = getHtmlElementFromRef(parent);

	return (!el || el === document.body)
		? false
		: el === parent ? true : elementBelongsTo(el.parentNode, parent);
}