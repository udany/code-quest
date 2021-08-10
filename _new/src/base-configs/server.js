import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

import api from './api.js';
import deepMerge from '../toolbox/helpers/deepMerge.js';

const defaultOptions = {
	port: process.env.PORT ? parseInt(process.env.PORT) : 9420,
	hmrPort: false,
	isProd: process.env.NODE_ENV === 'production',

	basePath: __dirname,

	client: {
		path: 'client'
	},

	api: {
		enabled: true,
		prefix: '/api'
	},

	/** @type {UserConfigExport} **/
	viteConfig: {},

	https: {
		enabled: process.env.HTTPS ? process.env.HTTPS !== 'false' : true,
		data: {
			key: '',
			cert: ''
		}
	}
};

export default async function createServer(options = defaultOptions) {
	options = deepMerge({ ...defaultOptions }, options);

	const resolve = (...p) => path.resolve(options.basePath, ...p);

	const indexProd = options.isProd ?
		fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
		: '';

	const manifest = options.isProd ?
		require('./dist/client/ssr-manifest.json')
		: {};

	const app = express();

	/** @type {import('vite').ViteDevServer} */
	let vite;

	if (!options.isProd) {
		vite = await require('vite').createServer({
			...options.viteConfig,
			logLevel: 'info',
			server: {
				middlewareMode: true,
				watch: {
					// During tests we edit the files too fast and sometimes chokidar
					// misses change events, so enforce polling for consistency
					usePolling: true,
					interval: 100
				},
				https: options.https.enabled ? options.https.data : null,
				hmr: {
					port: options.hmrPort ? options.hmrPort : options.port + 2000
				}
			}
		});

		// use vite's connect instance as middleware
		app.use(vite.middlewares);
	} else {
		app.use(require('compression')())
		app.use(
			require('serve-static')(resolve('dist/client'), {
				index: false
			})
		)
	}

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));

	if (options.api.enabled) app.use(options.api.prefix, api);

	app.use('*', async (req, res) => {
		try {
			const url = req.originalUrl

			let template, render;

			if (!options.isProd) {
				template = fs.readFileSync(resolve(options.client.path, 'index.html'), 'utf-8');

				template = await vite.transformIndexHtml(url, template);

				//render = (await vite.ssrLoadModule('/src/entry-server.js')).render
			} else {
				template = indexProd;
				//render = require('./dist/server/entry-server.js').render
			}

			const [appHtml, preloadLinks] = ['', ''];//await render(url, manifest);

			const html = template
			.replace(`<!--preload-links-->`, preloadLinks)
			.replace(`<!--app-html-->`, appHtml);

			res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
		} catch (e) {
			vite && vite.ssrFixStacktrace(e)
			console.log(e.stack)
			res.status(500).end(e.stack)
		}
	});

	const serverProtocol = options.https.enabled ? https : http;

	const server = serverProtocol.createServer({
		...options.https.data
	}, app);

	server.listen(options.port, () => {
		console.log(`http${options.https.enabled ? 's' : ''}://localhost:${options.port}`);
	});

	app.__server = server;

	return {
		server,
		app,
		api,
	};
}