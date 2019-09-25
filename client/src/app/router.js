import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Home from '../views/Home.vue'

Vue.use(Router);
Vue.use(Meta);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/about/',
			name: 'about',
			component: () => import(/* webpackChunkName: "Videos" */ '../views/About.vue')
		}
	]
})
