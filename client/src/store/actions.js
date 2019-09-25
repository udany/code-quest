export const actions = {
	startUpdateTime({ commit}) {
		setInterval(() => {
			commit('updateTime')
		}, 1000)
	}
};