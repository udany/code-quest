import { library } from '@fortawesome/fontawesome-svg-core'

import {
	faPlay,
	faPause,
	faVolumeUp,
	faVolumeDown,
	faVolumeOff,
	faVolumeMute,
	faCog,
	faCompress,
	faEye,
	faEyeSlash,
	faStar,
	faFileDownload,
	faRedoAlt
} from '@fortawesome/free-solid-svg-icons'

library.add(
	faPlay,
	faPause,
	faVolumeUp,
	faVolumeDown,
	faVolumeOff,
	faVolumeMute,
	faCog,
	faCompress,
	faEye,
	faEyeSlash,
	faStar,
	faFileDownload,
	faRedoAlt
);

import {
	faFacebookF,
	faInstagram,
	faDiscord
} from '@fortawesome/free-brands-svg-icons'

library.add(
	faFacebookF,
	faInstagram,
	faDiscord
);

import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import RbIcon from '../components/FaIcon';

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('rb-icon', RbIcon);