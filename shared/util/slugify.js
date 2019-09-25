import diacritics from '../base/diacritics';

export function slugify(str) {
	return diacritics.remove(str.toLowerCase().replace(/\s/gi, '-').replace(/-+/gi, '-'))
}