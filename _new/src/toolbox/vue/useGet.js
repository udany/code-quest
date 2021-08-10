import { unref } from 'vue';

/**
 * @param {Function, String} key
 * @param {Function, ?Object} def
 * @return {(function(*=): (*|null|undefined))|*}
 */
export function useGet(key, def = null) {
	return function (obj) {
		let value = unref(key);
		let result = null;

		if (typeof value === 'string') {
			result = obj[value];
		} else if (typeof value instanceof Function) {
			result = value(obj);
		} else {
			console.error('Expected string or function but received:', value);
		}

		if (result === null || result === undefined) {
			return def instanceof Function ? def() : def;
		} else {
			return result;
		}
	}
}