class Enum {
	constructor(data) {
		this._keys = Object.keys(data);

		for (let key of this._keys) {
			this[key] = {
				...data[key],
				key
			};
		}
	}

	toList() {
		return this._keys.map(x => this[x]);
	}

	/**
	 * @param id
	 * @returns {*}
	 */
	byId(id) {
		return this.getByProperty('id', id);
	}

	mapById() {
		let that = this;
		return (id) => that.byId(id);
	}

	/**
	 * @param {Function|string} property
	 * @param [value]
	 * @returns {*}
	 */
	getByProperty(property, value) {
		return this.toList().find(item => property instanceof Function ? property(item) : item[property] === value);
	}

	/**
	 * @param {Function|string} property
	 * @param [value]
	 * @returns {*}
	 */
	listByProperty(property, value) {
		return this.toList().filter(item => property instanceof Function ? property(item) : item[property] === value);
	}
}

export default Enum;