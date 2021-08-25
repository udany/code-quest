/**
 * @template T
 * @param {T} target
 * @param {*} source
 * @return {T}
 */
export default function deepMerge (target, source) {
	for (const key of Object.keys(source)) {
		if (source[key] instanceof Object){
			if (!target[key]) {
				if (source[key] instanceof Array) {
					target[key] = [];
				} else {
					target[key] = {};
				}
			}

			Object.assign(source[key], deepMerge(target[key], source[key]));
		}
	}

	Object.assign(target || {}, source);

	return target;
}