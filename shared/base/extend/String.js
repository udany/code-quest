/**
 * Pads a string (e.g.: "9" may become "009" and "10" "010").
 * @param character
 * @param size
 * @param [right]
 * @returns {String}
 */
String.prototype.pad = function (character, size, right) {
	let s = this + '';
	if (!right) {
		while (s.length < size) s = character + s;
	} else {
		while (s.length < size) s = s + character;
	}
	return s;
};

String.prototype.format = function (values, pattern) {
	if (!pattern) {
		pattern = (key) => `{${key}}`;
	}

	let final = this.toString();
	for (let i in values) {
		if (values.hasOwnProperty(i)) {
			let match = pattern;
			if (typeof pattern === 'string') {
				match = pattern.replace('?', i);
			} else if (pattern instanceof Function) {
				match = pattern(i);
			}

			final = final.replace(
				new RegExp(RegExp.escape(match), 'g'),
				values[i]
			);
		}
	}

	return final;
};

String.prototype.nl2br = function () {
	return this.replace(/\n/g, '<br>');
};
