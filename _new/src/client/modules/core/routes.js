import levelRoutes from '../../views/routes';
import session from '../../util/session.js';

const baseRoute = '/';

export default [
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
		component: () => import('./Login.vue'),
	},
	...levelRoutes
];