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

export const app = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');


// import './app/analytics'
