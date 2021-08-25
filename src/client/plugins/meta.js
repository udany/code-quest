import { createMetaManager, plugin as metaPlugin } from 'vue-meta';

export default function (app) {
	const metaManager = createMetaManager();
	app.use(metaManager);
	app.use(metaPlugin);
}