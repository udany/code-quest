export function importContext(context) {
	const results = [];
	const keys = context.keys();

	for (let key of keys) {
		const level = context(key).default;

		results.push(level);
	}

	return results;
}

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

	return levelRoutes;
}

const worldsContext = require.context('../', true, /world-[0-9]*\/index\.js$/);

/** @type {CqWorld[]} **/
export const worlds = importContext(worldsContext);

export const levels = [];

for (let world of worlds) {
	levels.push(...world.levels);
}

const levelRoutes = generateLevelRoutes(levels);

export default levelRoutes;