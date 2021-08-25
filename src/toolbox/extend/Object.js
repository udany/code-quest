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

Object.compare = function (obj1, obj2) {
	//Loop through properties in object 1
	for (let property in obj1) {
		//Check property exists on both objects
		if (obj1.hasOwnProperty(property) !== obj2.hasOwnProperty(property)) return false;

		switch (typeof (obj1[property])) {
			//Deep compare objects
			case 'object':
				if (!Object.compare(obj1[property], obj2[property])) return false;
				break;
			//Compare function code
			case 'function':
				if (typeof (obj2[property]) === 'undefined' || (property !== 'compare' && obj1[property].toString() !== obj2[property].toString())) return false;
				break;
			//Compare values
			default:
				if (obj1[property] !== obj2[property]) return false;
		}
	}

	//Check object 2 for any extra properties
	for (let p in obj2) {
		if (typeof (obj1[p]) === 'undefined') return false;
	}

	return true;
};