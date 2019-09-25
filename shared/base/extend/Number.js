import './String';

/**
 * Generates a random integer
 * @param max
 * @param min
 * @returns {number}
 */
Math.randomInt = function (max, min) {
	if (!min) min = 0;
	return Math.floor(Math.random() * (max - min)) + min;
};

Number._decimalChar = '.';
Number.setDecimalChar = function (val) {
	this._decimalChar = val;
};
Number.prototype.pad = function (size, decimalSize, decimalChar) {
	if (!decimalChar) decimalChar = Number._decimalChar;

	let negative = this < 0;
	let val = Math.abs(this);

	let str = val.toString();
	str = str.split('.');

	let result = str[0].pad('0', size || 0);

	if (decimalSize && str.length === 1) {
		str[1] = '0';
	}

	if (str.length === 2) {
		result += decimalChar + str[1].pad('0', decimalSize, true);
	}

	if (negative) result = '-' + result;

	return result;
};
