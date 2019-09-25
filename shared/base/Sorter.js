import {Emitter} from './General';

class Sorter extends Emitter {
	constructor(compareFn, direction = 0, priority = 0) {
		super();

		this.compareFn = compareFn;
		this.direction = direction;
		this.priority = priority;

		this._transformations = [];
	}

	caseInsensitive() {
		this.addTransform(o => o.toLowerCase());
		return this;
	}

	addTransform(fn) {
		this._transformations.push(o => fn(o));
		return this;
	}

	compare(a, b) {
		for (let t of this._transformations) {
			a = t(a);
			b = t(b);
		}

		return this.direction ? this.direction * (this.compareFn ? this.compareFn(a, b) : Sorter.baseCompare(a, b)) : 0;
	}

	static baseCompare(a, b) {
		if (a < b) {
			return -1;
		}

		if (a > b) {
			return 1;
		}

		return 0;
	}

	cycle(sorters) {
		let priority = 0;

		if (sorters) {
			priority = Sorter.maxPriority(sorters) + 1;
		}

		if (this.direction === 0) {
			this.direction = 1;
			this.priority = priority;
		} else if (this.direction === 1) {
			this.direction = -1;
		} else {
			this.direction = 0;
			this.priority = 0;
		}
	}

	/**
	 * Sorts an array
	 * @param {Array} data
	 * @param {Sorter|Sorter[]} sorters
	 */
	static sort(data, sorters) {
		if ((sorters instanceof Sorter)) sorters = [sorters];
		if (!(sorters instanceof Array)) sorters = Object.values(sorters);

		sorters = sorters.filter(x => x.direction).sort((a, b) => a.priority - b.priority);

		return ([]).concat(data).sort(function (a, b) {
			for (let sorter of sorters) {
				let r = sorter.compare(a, b);
				if (r !== 0) {
					return r;
				}
			}
			return 0;
		});
	}

	static maxPriority(sorters) {
		if (!(sorters instanceof Array)) sorters = Object.values(sorters);

		return sorters.reduce((accumulator, s) => Math.max(accumulator || s.priority, s.priority), 0);
	}

	/**
	 * Creates a sorter from an Entity attribute
	 * @param attribute
	 * @param direction
	 * @param priority
	 * @returns {Sorter}
	 */
	static fromAttribute(attribute, direction = 0, priority = 0) {
		if (!attribute) throw 'Can\'t create a mofo sorter from an attribute without the attribute';

		return (new Sorter(null, direction, priority)).addTransform(o => attribute.Get(o));
	}
}

export default Sorter;
