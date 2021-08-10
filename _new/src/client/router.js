import { createRouter, createWebHistory } from 'vue-router'

const routes = [];

// This imports all routes
const contexts = import.meta.globEager('./modules/*/*routes.js')

for (let path of Object.keys(contexts)) {
	let partial = contexts[path];
	routes.push(...partial.default);
}

const router = createRouter({
	history: createWebHistory(),
	routes: [
		...routes
	],
});

export default router;
