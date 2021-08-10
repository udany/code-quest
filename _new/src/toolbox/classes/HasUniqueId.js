export class HasUniqueId {
	constructor() {
	}

	getUniqueId() {
		if (!this.__uid) {
			HasUniqueId.counter++;
			const now = Date.now();
			const rand = Math.randomInt(9999999).pad(7);
			this.__uid = `${now}_${HasUniqueId.counter}_${rand}`;
		}
		return this.__uid;
	}
}

HasUniqueId.counter = 0;

export default HasUniqueId;