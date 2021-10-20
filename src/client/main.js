import '../toolbox/extend';
import './css/main.scss';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import plugins from './plugins';


const app = createApp(App);

app.use(router);
app.use(plugins);

app.mount('#app');
