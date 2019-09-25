/**
 * @class TestCase
 *
 * @property {String} [description]
 * @property {Array} inputs
 * @property {Any|Function} outputs
 */
export class TestCase {
	/**
	 * @typedef {Object} TestCaseOptions
	 * @property {String} [description]
	 * @property {Array} inputs
	 * @property {Array|Function} outputs
	 */

	/**
	 *
	 * @param {TestCaseOptions} options
	 */
	constructor(options) {
		Object.assign(this, options)
	}

	/**
	 *
	 * @param {Function} fn
	 * @returns {Boolean}
	 */
	run(fn) {
		let result = fn(...this.inputs);

		if (this.outputs instanceof Function) {
			return this.outputs(result);
		} else {
			return this.outputs === result;
		}
	}
}

/**
 * @class TestGroup
 *
 * @property {String} name
 * @property {String} [signature]
 * @property {String} [description]
 * @property {Function} fn
 * @property {TestCase[]} cases
 */
export class TestGroup {
	/**
	 * @typedef {Object} TestGroupOptions
	 * @property {String} name
	 * @property {String} [signature]
	 * @property {String} [description]
	 * @property {Function} fn
	 */

	/**
	 *
	 * @param {TestGroupOptions} options
	 */
	constructor(options) {
		Object.assign(this, options);
		this.cases = [];
	}

	/**
	 *
	 * @param {TestCase} testCase
	 * @return {TestGroup}
	 */
	addCase(testCase) {
		this.cases.push(testCase);

		return this;
	}

	/**
	 *
	 * @param {TestCase} [testCase]
	 * @returns {Boolean}
	 */
	run(testCase) {
		if (testCase) {
			return testCase.run(this.fn);
		} else {
			let state = true;

			for (const tc of this.cases) {
				if (!tc.run(this.fn)) {
					state = false;
					break;
				}
			}

			return state;
		}
	}
}
