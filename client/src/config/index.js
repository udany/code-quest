let env = process.env.NODE_ENV || 'development';
const {default: config} = require('./config.' + env);

export default config;