import { useMouse as vueUseMouse, useEventListener, unrefElement } from '@vueuse/core';
import { computed, inject, provide, reactive, readonly, watch, watchEffect } from 'vue';

export const mouseButtons = {
	primary: 0,
	secondary: 2,
	auxiliary: 1,
};

export const mouseCursor = {
	grab: 'grab',
	grabbing: 'grabbing',
	resizeN: 'n-resize',
	resizeNE: 'ne-resize',
	resizeE: 'e-resize',
	resizeSE: 'se-resize',
	resizeS: 's-resize',
	resizeSW: 'sw-resize',
	resizeW: 'w-resize',
	resizeNW: 'nw-resize'
};

export function useMouse() {
	const { x, y } = vueUseMouse();

	const buttons = reactive({
		[mouseButtons.primary]: false,
		[mouseButtons.secondary]: false,
		[mouseButtons.auxiliary]: false,
	});

	const setButton = (button, state) => {
		buttons[button] = state;
	}

	useEventListener('mousedown', (e) => {
		setButton(e.button, true);
	},{ passive: true });

	useEventListener('mouseup', (e) => {
		setButton(e.button, false);
	},{ passive: true });

	useEventListener('blur', (e) => {
		setButton(mouseButtons.primary, false);
		setButton(mouseButtons.secondary, false);
		setButton(mouseButtons.auxiliary, false);
	},{ passive: true });

	return readonly(reactive({
		x,
		y,
		buttons
	}));
}

export function provideMouse() {
	const mouse = useMouse();
	provide('mouse', mouse);

	return mouse;
}


export function provideCursor() {
	const state = reactive({
		current: '',

		set(val = '') {
			state.current = val;
		},

		clear() {
			state.set();
		},
		style: computed(() => {
			if (state.current) {
				return {
					cursor: state.current + ' !important'
				};
			} else {
				return {};
			}
		})
	});

	provide('cursor', state)

	return state;
}

export function injectCursor() {
	return inject('cursor');
}

/**
 *
 * @return {{buttons: Map<Number, Boolean>, x: number, y: number}}
 */
export function injectMouse() {
	const mouse = inject('mouse');

	if (mouse) {
		return mouse;
	} else {
		console.warn(`Attempting to inject mouse in a context where there isn't one, providing one as a fallback`);
		return provideMouse();
	}
}

export function useHold() {
	const mouse = injectMouse();

	const handleButtonChange = (button, now, then) => {
		if (then && !now) {
			state.holding.filter(x => x.button === button).forEach(x => x.return(false));
		}
	}

	const state = reactive({
		/** @type {{ button, return: Function, timeout}[]} **/
		holding: [],

		/**
		 *
		 * @param {Number} time
		 * @param {Number} ?button
		 * @return {Promise<Boolean>}
		 */
		for: (time = 160, { button = mouseButtons.primary } = {}) => {
			let resolve;

			const entry = {
				button,
				return(value) {
					if (entry.timeout) clearTimeout(entry.timeout);

					state.holding.remove(entry);

					resolve(value);
				},
				timeout: setTimeout(() => {
					entry.timeout = null;

					entry.return(true);
				}, time)
			};
			
			state.holding.push(entry);

			return new Promise(r => { resolve = r; })
		},
		mouseUp: (event) => {
			handleButtonChange(event.button, false, true);
		}
	});

	watch(
		() => mouse.buttons[mouseButtons.primary],
		(now, then) => handleButtonChange(mouseButtons.primary, now, then)
	);

	watch(
		() => mouse.buttons[mouseButtons.auxiliary],
		(now, then) => handleButtonChange(mouseButtons.auxiliary, now, then)
	);

	watch(
		() => mouse.buttons[mouseButtons.secondary],
		(now, then) => handleButtonChange(mouseButtons.secondary, now, then)
	);

	return state;
}

export function useDoubleClick({
	timeout = 400
} = {}) {
	let doubleClickTime = timeout, doubleClickTimeout;

	function isDoubleClick() {
		if (doubleClickTimeout) {
			clearTimeout(doubleClickTimeout)
			doubleClickTimeout = null;

			return true;
		} else {
			doubleClickTimeout = setTimeout(() => {
				doubleClickTimeout = null;
			}, doubleClickTime);

			return false;
		}
	}

	return {
		isDoubleClick
	};
}

export function useDrag({
	element = null,
	button = mouseButtons.primary,
	enabled = true,
	manual = false,
	cursor = null,
	scale = 1,
	swapYAxisWithZ = false,
	autoReset = false,
	onStart = null,
	onChange = null,
	onEnd = null,
} = {}) {
	const mouse = injectMouse();
	if (!cursor) cursor = injectCursor();

	const state = reactive({
		dragging: false,
		enabled: enabled,
		scale: scale,
		start: {
			x: 0, y: 0
		},
		delta: {
			x: 0, y: 0, z: 0
		},
		swapYAxisWithZ,
		mouse,
		preBegin() {
			if (!state.enabled) return;

			state.reset();
			state.start.x = mouse.x;
			state.start.y = mouse.y;
		},
		begin({preventReset = false} = {}) {
			if (!preventReset) state.preBegin();

			state.dragging = true;

			if (cursor) cursor.set('grabbing');
			if (onStart) onStart();
		},
		end() {
			state.dragging = false;

			if (onEnd) onEnd();
			if (cursor) cursor.clear();
			if (autoReset) state.reset();
		},
		reset() {
			state.delta.x = 0;
			state.delta.y = 0;
			state.delta.z = 0;
		}
	});

	watch([() => mouse.x, () => mouse.y], () => {
		if (!state.enabled || !state.dragging) return;

		state.delta.x = (mouse.x - state.start.x) * state.scale;

		if (state.swapYAxisWithZ) {
			state.delta.y = 0;
			state.delta.z = (mouse.y - state.start.y) * state.scale;
		} else {
			state.delta.z = 0;
			state.delta.y = (mouse.y - state.start.y) * state.scale;
		}

		if (onChange) onChange();
	}, {
		immediate: true
	});

	watch(() => state.enabled, (now, then) => {
		if (!now && then) {
			state.end();
		}
	})

	if (!manual) {
		const target = computed(() => unrefElement(element) || window);

		useEventListener(target, 'mousedown',(event) => {
			if (!state.enabled) return;

			if (event.button === button) {
				state.begin();
			}
		}, { passive: true });
	}

	useEventListener(window, 'mouseup',(event) => {
		if (!state.enabled) return;

		if (state.dragging && (event.button === button || manual)) {
			state.end();
		}
	}, { passive: true });

	return state;
}

export const resizeModes = {
	top: {
		ratio: { x: 0, y: 1, w: 0, h: -1 }
	},
	topRight: {
		ratio: { x: 1, y: 1, w: 1, h: -1 }
	},
	right: {
		ratio: { x: 1, y: 0, w: 1, h: 0 }
	},
	bottomRight: {
		ratio: { x: 1, y: 1, w: 1, h: 1 }
	},
	bottom: {
		ratio: { x: 0, y: 1, w: 0, h: 1 }
	},
	bottomLeft: {
		ratio: { x: 1, y: 1, w: -1, h: 1 }
	},
	left: {
		ratio: { x: 1, y: 0, w: -1, h: 0 }
	},
	topLeft: {
		ratio: { x: 1, y: 1, w: -1, h: -1 }
	},
}

export function useResize({
	button = mouseButtons.primary,
	scale = 1,
	autoReset = false,
	onStart = null,
	onChange = null,
	onEnd = null,
} = {}) {
	const drag = useDrag({
		button,
		scale,
		manual: true,
		autoReset,
		onStart,
		onChange,
		onEnd: () => {
			if (onEnd) onEnd();
			state.reset();
		}
	});

	const state = reactive({
		resizing: computed(() => drag.dragging),
		delta: {
			x: computed(() => drag.delta.x * (state.mode?.ratio.x || 0)),
			y: computed(() => drag.delta.y * (state.mode?.ratio.y || 0)),
			w: computed(() => drag.delta.x * (state.mode?.ratio.w || 0)),
			h: computed(() => drag.delta.y * (state.mode?.ratio.h || 0)),
		},
		mode: null,
		begin(mode) {
			if (mode) state.mode = mode;
			drag.begin();
		},
		reset() {
			state.mode = null;
			drag.reset();
		}
	});

	return state;
}

export function useRotate({
	button = mouseButtons.primary,
	getCenter,
	autoReset = false,
	onStart = null,
	onChange = null,
	onEnd = null,
} = {}) {
	const drag = useDrag({
		button,
		manual: true,
		autoReset,
		onStart,
		onEnd
	});

	const state = reactive({
		drag,
		rotating: computed(() => drag.dragging),
		rotation: {
			x: 0,
			y: 0,
			z: 0
		},

		center: {
			x: 0,
			y: 0
		},

		ratio: {
			x: 0,
			y: 0,
			z: 1
		},

		a: computed(() => ({
			x: drag.start.x - state.center.x,
			y: drag.start.y - state.center.y,
		})),

		b: computed(() => ({
			x: state.a.x + drag.delta.x,
			y: state.a.y + drag.delta.y,
		})),

		updateCenter() {
			state.center = getCenter();
		},

		begin(ratio) {
			if (ratio) state.ratio = ratio;
			state.updateCenter();
			drag.begin();
		},

		reset() {
			state.rotation = {
				x: 0,
				y: 0,
				z: 0
			};
			drag.reset();
		}
	});

	const radToDeg = (angle) => angle * (180 / Math.PI);

	watch([() => drag.delta.x, () => drag.delta.y], () => {
		if (state.rotating) {
			let firstAngle = Math.atan2(state.a.y, state.a.x);
			let secondAngle = Math.atan2(state.b.y, state.b.x);

			let rotation = radToDeg(secondAngle - firstAngle);

			state.rotation.x = rotation * state.ratio.x;
			state.rotation.y = rotation * state.ratio.y;
			state.rotation.z = rotation * state.ratio.z;

			if (onChange) onChange();
		}
	}, {
		immediate: true
	});


	return readonly(state);
}