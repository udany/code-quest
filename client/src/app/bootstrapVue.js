import Vue from 'vue'

import {
	BContainer,
	BCol,
	BRow,
	BButton,
	BCollapse
} from 'bootstrap-vue'

Vue.component('BContainer', BContainer);
Vue.component('BCol', BCol);
Vue.component('BRow', BRow);
Vue.component('BButton', BButton);
Vue.component('BCollapse', BCollapse);

// Directives

import { VBTooltip, VBToggle} from 'bootstrap-vue';

Vue.directive('b-toggle', VBToggle);
Vue.directive('b-tooltip', VBTooltip);