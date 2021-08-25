import { reactive } from 'vue';
import { useEventListener } from '@vueuse/core';

export function useKeys(...keys) {
	const state = reactive({});

	const reset = () => {
		for (let key of keys) {
			state[key] = false;
		}
	}
	reset();

	useEventListener('keydown', (e) => {
		if (state.hasOwnProperty(e.key)) {
			state[e.key] = true;
		}
	});

	useEventListener('keyup', (e) => {
		if (state.hasOwnProperty(e.key)) {
			state[e.key] = false;
		}
	});

	useEventListener('blur', (e) => {
		reset();
	});

	return state;
}