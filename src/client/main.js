import '../toolbox/extend';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import plugins from './plugins';

import './css/main.scss';

const app = createApp(App);
app.use(router);
app.use(plugins);
app.mount('#app');

//import plugins from './plugins'
//app.use(plugins);