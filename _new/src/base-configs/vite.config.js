import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import deepMerge from '../toolbox/helpers/deepMerge.js';

const defaultOptions = {
	root: './client',
	/** @type {{find: string, replacement: string}[]} **/
	alias: [],

	/** @type {String} **/
	sassAutoImport: null
};

function createViteConfig(options = defaultOptions) {
	options = deepMerge({ ...defaultOptions }, options);

	const sassOptions = {};
	if (options.sassAutoImport) {
		sassOptions.additionalData = `@import '${options.sassAutoImport}';\n`
	}

	return defineConfig({
		root: options.root,
		plugins: [
			vue({
				template: {
					compilerOptions: {
						whitespace: "preserve",
					},
				},
			})
		],
		resolve: {
			alias: options.alias
		},
		css: {
			preprocessorOptions: {
				scss: {
					...sassOptions,
					importer: function () { return null; }
				}
			}
		}
	});
}

export default createViteConfig;