const levelsContext = require.context('./', true, /Level-[0-9]*-[0-9]*\.vue$/);

const levelRoutes = [];

const keys = levelsContext.keys();

for (let key of keys) {
	const level = levelsContext(key).default;

	levelRoutes.push({
		name: level.name,
		path: '/' + level.name.toLowerCase(),
		component: level
	});
}

export default levelRoutes;