export function generateLevelRoutes(levels) {
	const levelRoutes = [];

	for (let level of levels) {
		levelRoutes.push({
			name: level.name,
			path: '/' + level.name.toLowerCase(),
			component: level,
			meta: level.info
		});
	}


	for (let route of levelRoutes) {
		let idx = levelRoutes.indexOf(route);

		route.meta.previousLevel = levelRoutes[idx - 1];
		route.meta.nextLevel = levelRoutes[idx + 1];
	}

	return levelRoutes;
}

export function globToArray(contexts) {
	let r = [];
	for (let path of Object.keys(contexts)) {
		let partial = contexts[path];
		r.push(partial.default);
	}

	return r;
}

const worldsContext = import.meta.globEager('../world-*/index.js');

/** @type {CqWorld[]} **/
export const worlds = globToArray(worldsContext);

export const levels = [];

for (let world of worlds) {
	levels.push(...world.levels);
}

const levelRoutes = generateLevelRoutes(levels);

export default levelRoutes;