let gCfg = require('./config.global');

let config = {
	...gCfg,
	mysql: {
		...gCfg.mysql,
		password: 'DwZcpuuvuKr6CYtm',
	},
	debug: false
};

export default config;