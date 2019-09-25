// vue.config.js
const path = require('path');

const sourcePath = path.resolve(__dirname, 'src/');

const favicon = 'img/icons/favicon-256.png';

module.exports = {
	devServer: {
		port: 8080,
		// host: 'local.website.com'
	},
	css: {
		loaderOptions: {
			sass: {
				data: `@import '~src/css/global.scss';`
			}
		}
	},
	configureWebpack: {
		resolve: {
			alias: {
				src: sourcePath
			}
		}
	},
	pwa: {
		name: 'Code Quest',
		themeColor: '#071126',
		msTileColor: '#071126',
		iconPaths: {
			favicon32: favicon,
			favicon16: favicon,
			appleTouchIcon: favicon,
			maskIcon: favicon,
			msTileImage: favicon
		}
	}
};