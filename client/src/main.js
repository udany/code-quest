import '../../shared/base/extend';

import Vue from 'vue'
import App from './App.vue'
import './css/main.scss'

import './app/registerServiceWorker'
import './app/bootstrapVue'
import './app/fontAwesome'
import router from './app/router'
import store from './store'

Vue.config.productionTip = false;

import hljs from 'highlight.js';
hljs.configure({
	tabReplace: '    '
});

import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS);

export const app = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');