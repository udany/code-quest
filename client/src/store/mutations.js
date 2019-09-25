export const mutations = {
	updateTime(state) {
		state.now = Date.now();
		if (state.now - state.nowLazy > 1000 * 30) {
			state.nowLazy = state.now;
		}
	}
};