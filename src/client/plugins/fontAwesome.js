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
	faUndoAlt,
	faRedoAlt,
	faTimes,
	faPencilAlt,
	faPlus,
	faSave,
	faSyncAlt,
	faTrash,
	faCheck,
	faChevronLeft,
	faChevronRight,
	faChevronUp,
	faSort,
	faMusic,
	faGripHorizontal,
	faGripVertical,
	faInfo,
	faLayerGroup,
	faObjectGroup,
	faObjectUngroup,

	faCaretDown,
	faCaretLeft,
	faCaretRight,
	faCaretUp,

	faQuestion,
	faCopy,
	faPaste,
	faClone,

	faFont,
	faBold,
	faItalic,
	faUnderline,
	faStrikethrough,
	faAlignLeft,
	faAlignCenter,
	faAlignRight,
	faCaretSquareDown,
	faCaretSquareUp,
	faMinusSquare,
	faCompressAlt,
	faExpandAlt,

	faBars,
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
	faUndoAlt,
	faRedoAlt,
	faTimes,
	faPencilAlt,
	faPlus,
	faSave,
	faSyncAlt,
	faTrash,
	faCheck,
	faChevronLeft,
	faChevronRight,
	faChevronUp,
	faSort,
	faMusic,
	faGripHorizontal,
	faGripVertical,
	faInfo,
	faLayerGroup,
	faObjectGroup,

	faCaretDown,
	faCaretLeft,
	faCaretRight,
	faCaretUp,

	faQuestion,
	faCopy,
	faPaste,
	faClone,

	faFont,
	faBold,
	faItalic,
	faUnderline,
	faStrikethrough,
	faAlignLeft,
	faAlignCenter,
	faAlignRight,
	faCaretSquareDown,
	faCaretSquareUp,
	faMinusSquare,
	faCompressAlt,
	faExpandAlt,

	faBars,
);

// import {
// 	faFacebookF,
// 	faInstagram,
// 	faDiscord
// } from '@fortawesome/free-brands-svg-icons'
//
// library.add(
// 	faFacebookF,
// 	faInstagram,
// 	faDiscord
// );

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import FaIcon from '../components/FaIcon.vue';

export default function (app) {
	app.component('font-awesome-icon', FontAwesomeIcon);
	app.component('FaIcon', FaIcon);
}