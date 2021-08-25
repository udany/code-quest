function useTimer(fn, time = 0) {
	let state = {
		id: 0,
		done: false,
		time,
		start(time) {
			if (time === undefined) time = state.time;
			if (state.id) state.stop();

			state.done = false;

			state.id = setTimeout(() => {
				state.id = 0;
				state.done = true;
				fn();
			}, time);
		},
		stop() {
			if (!state.done) {
				clearTimeout(id);
				state.id = 0;
			}
		}
	};

	if (time) state.start(time);

	return state;
}