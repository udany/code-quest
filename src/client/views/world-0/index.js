import { globToArray } from '../routes';
import { CqWorld } from '../../../shared/entities/world';

const levelsContext = import.meta.globEager('./*/Level-*-*.vue');
const levels = globToArray(levelsContext);

export default new CqWorld({
	name: 'Bem Vindo',
	number: 0,
	levels
});