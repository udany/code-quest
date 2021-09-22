import { createRouter, createWebHistory } from 'vue-router';
import levelRoutes from './views/routes';
import Achievements from './views/Achievements.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			redirect: 'level-0-0'
		},
		{
			path: '/achievements',
			name: 'achievements',
			component: Achievements
		},
		...levelRoutes
	],
});

router.beforeEach(() => {
	window.scrollTo(0,0);
})

export default router;
