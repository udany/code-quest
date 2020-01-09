let gCfg = require('./config.global');

let config = {
	...gCfg,
	mysql: {
		...gCfg.mysql,
		password: '',
	},
	debug: false
};

export default config;