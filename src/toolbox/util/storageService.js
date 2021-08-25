const storageKey = 'ud-light-';

function retrive(prop) {
	let storedValue = localStorage.getItem(storageKey+prop);
	if (storedValue) {
		return JSON.parse(storedValue);
	}

	return null;
}

function store(prop, value) {
	localStorage.setItem(storageKey+prop, JSON.stringify(value));
}

const storageService = new Proxy({}, {
	get(target, prop) {
		if (!target.hasOwnProperty(prop)) {
			target[prop] = retrive(prop);
		}

		return target[prop];
	},
	set(target, prop, value) {
		store(prop, value);
		return target[prop] = value;
	}
});

window.addEventListener('beforeunload', () => {
	const keys = Object.keys(storageService);

	for (let key of keys) {
		store(key, storageService[key]);
	}

	return true;
});


export default storageService;