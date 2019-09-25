import Vue from 'vue'
import Vuex from 'vuex'
import {state} from './state';
import {mutations} from './mutations';
import {actions} from './actions';

Vue.use(Vuex);

/**
 * @type {Store}
 */
export const store = new Vuex.Store({
	state,
	mutations,
	actions
});


//store.dispatch('startUpdateTime');

export default store;