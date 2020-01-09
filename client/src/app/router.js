import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import levelRoutes from '../views/routes/';
import session from '../util/session';

Vue.use(Router);
Vue.use(Meta);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			redirect: 'level-0-0'
		},
		{
			path: '/login',
			name: 'login',
			beforeEnter: (to, from, next) => {
				if(session.user){
					next('/');
				}else next();
			},
			component: () => import('../views/Login'),
		},
		...levelRoutes
	]
})
