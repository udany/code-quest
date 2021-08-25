import { getHtmlElementFromRef } from './useHtmlElement.js';
import { getBoundingBox } from './getBoundingBox.js';

/**
 * @param {HTMLElement} element
 * @return {Boolean}
 */
export function isScrollable (element) {
	element = getHtmlElementFromRef(element);

	const hasScrollableContent = element.scrollHeight > element.clientHeight;

	const overflowYStyle = window.getComputedStyle(element).overflowY;
	const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;

	return hasScrollableContent && !isOverflowHidden;
}

/**
 * @param {HTMLElement} element
 * @return {HTMLElement|null}
 */
export function getScrollableParent (element) {
	let el = getHtmlElementFromRef(element);

	return (!el || el === document.body)
		? document.body
		: (isScrollable(el) ? el : getScrollableParent(el.parentNode));
}

export function scrollTo(elementRef, to, { behavior = 'smooth' } = {}) {
	let element = getHtmlElementFromRef(elementRef);

	if (element) element.scroll({ behavior: behavior, top: to });
}

export function scrollToElement(targetRef, {
	scrollParent = null,
	behavior = 'smooth',
	topOffsetPercentage = 0,
	centerTarget = false
} = {}) {
	let target = getHtmlElementFromRef(targetRef);
	let scroll = getHtmlElementFromRef(scrollParent);

	if (!scroll && target) {
		scroll = getScrollableParent(target);
	}

	if (!scroll || !target) return;

	let targetBox = getBoundingBox(target);
	let scrollBox = getBoundingBox(scroll);

	let delta = targetBox.y - scrollBox.y;
	if (topOffsetPercentage) delta -= scrollBox.h * topOffsetPercentage;
	if (centerTarget) delta += targetBox.h / 2;

	scrollTo(scroll, scroll.scrollTop + delta, { behavior });
}