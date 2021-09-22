import open from 'open';
import createServer from './base-configs/server.js';
import createViteConfig from './base-configs/vite.config.js';
import registerApi from './api';

async function startServer() {
	const { server, app, api } = await createServer({
		basePath: __dirname,
		https: {
			enabled: false
		},
		port: 8420,
		viteConfig: createViteConfig({
			root: './src/client',
			sassAutoImport: 'src/client/css/global.scss'
		})
	});

	registerApi(api);

	open('http://localhost:8420');
}

startServer();
