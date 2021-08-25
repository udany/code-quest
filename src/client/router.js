import { createRouter, createWebHistory } from 'vue-router';
import levelRoutes from './views/routes';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			redirect: 'level-0-0'
		},
		...levelRoutes
	],
});

export default router;
