import Vue from 'vue'

import {
	BContainer,
	BCol,
	BRow,
	BButton
} from 'bootstrap-vue'

Vue.component('BContainer', BContainer);
Vue.component('BCol', BCol);
Vue.component('BRow', BRow);
Vue.component('BButton', BButton);

// Directives

import { VBTooltip } from 'bootstrap-vue';

Vue.directive('b-tooltip', VBTooltip);