import './Number';

Date.prototype.format = function (f) {
	if (!this.strings) {
		this.strings = {};
		for (let k of Object.keys(Date.formatStrings)) {
			let o = Date.formatStrings[k];
			let val;
			if (o[0] instanceof Function) {
				val = o[0](this);
			} else {
				val = this[o[0]]();
			}
			if (o.length >= 3) val += o[2];
			if (o.length >= 2) val = val.pad(o[1]);

			this.strings[k] = val;
		}
	}

	for (let k of Object.keys(Date.formatStrings)) {
		f = f.replace(k, this.strings[k]);
	}

	return f;
};

Date.prototype.getLocalizedMonth = function (lang) {
	return Date[lang].months[this.getMonth()];
};

Date.prototype.getLocalizedWeekday = function (lang) {
	return Date[lang].weekdays[this.getDay()];
};


Date.formatStrings = {
	d: ['getDate', 2],
	j: ['getDate'],
	/// month starts at 0, third index tells it to add 1 to the value
	m: ['getMonth', 2, 1],
	Y: ['getFullYear', 4],
	H: ['getHours', 2],
	h: [function (d) {
		return d.getHours() - (d.getHours() > 12 ? 12 : 0)
	}, 2],
	i: ['getMinutes', 2],
	s: ['getSeconds', 2],
	A: [function (d) {
		return (d.getHours() > 12 ? 'PM' : 'AM')
	}, 2]
};

Date.ptbr = {
	weekdays: [
		'Domingo',
		'Segunda',
		'Terça',
		'Quarta',
		'Quinta',
		'Sexta',
		'Sábado'
	],
	months: [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro'
	]
};

Date.prototype.stdTimezoneOffset = function () {
	let fy = this.getFullYear();
	if (!Date.prototype.stdTimezoneOffset.cache.hasOwnProperty(fy)) {

		let maxOffset = new Date(fy, 0, 1).getTimezoneOffset();
		let monthsTestOrder = [6, 7, 5, 8, 4, 9, 3, 10, 2, 11, 1];

		for (let mi = 0; mi < 12; mi++) {
			let offset = new Date(fy, monthsTestOrder[mi], 1).getTimezoneOffset();
			if (offset !== maxOffset) {
				maxOffset = Math.max(maxOffset, offset);
				break;
			}
		}
		Date.prototype.stdTimezoneOffset.cache[fy] = maxOffset;
	}
	return Date.prototype.stdTimezoneOffset.cache[fy];
};

Date.prototype.stdTimezoneOffset.cache = {};

Date.prototype.isDST = function () {
	return this.getTimezoneOffset() < this.stdTimezoneOffset();
};
