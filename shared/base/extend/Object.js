Object.map = function (obj, fn) {
	const keys = Object.keys(obj);

	return keys.reduce((a, key) => {
		a[key] = fn(obj[key], key);
		return a;
	}, {});
};

Object.mapToArray = function (obj, fn) {
	const keys = Object.keys(obj);
	return keys.map(key => fn(obj[key], key));
};

Object.forEach = function (obj, fn) {
	for (let key in this) {
		if (this.hasOwnProperty(key)) fn(this[key]);
	}
};
