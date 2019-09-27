import {importContext} from '../routes';
import {CqWorld} from '../../../../shared/entities/world';

const levelsContext = require.context('./', true, /Level-[0-9]*-[0-9]*\.vue$/);

const levels = importContext(levelsContext);

export default new CqWorld({
	name: 'Hello World',
	number: 1,
	levels
});