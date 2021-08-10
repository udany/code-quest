import { useEventListener } from '@vueuse/core';
import { inject, provide, reactive, readonly } from 'vue';

/**
 * @typedef {Object} Screen
 *
 * @property {Number} w
 * @property {Number} h
 */

/**
 * @return {Screen}
 */
export function useScreen() {
	let screen = reactive({
		w: 0,
		h: 0
	});

	function updateSize() {
		screen.w = window.innerWidth;
		screen.h = window.innerHeight;
	}

	updateSize();

	useEventListener('resize', (e) => {
		updateSize();
	},{ passive: true });

	return readonly(screen);
}

/**
 * @return {Screen}
 */
export function provideScreen() {
	const screen = useScreen();
	provide('screen', screen);

	return screen;
}

/**
 * @return {Screen}
 */
export function injectScreen() {
	return inject('screen');
}