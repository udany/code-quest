import {importContext} from '../routes';
import {CqWorld} from '../../../../shared/entities/world';

const levelsContext = require.context('./', true, /Level-.*\.vue$/);

const levels = importContext(levelsContext);

export default new CqWorld({
	name: 'Hello World',
	number: 1,
	levels
});