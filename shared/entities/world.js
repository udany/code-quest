/**
 * @typedef {Object} CqWorldData
 *
 * @property {String} name
 * @property {Number} number
 * @property {Object[]} levels
 */


/**
 * @class CqWorld
 *
 * @property {String} name
 * @property {Number} number
 * @property {Object[]} levels
 */
export class CqWorld {
	/**
	 * @param {CqWorldData} data
	 */
	constructor(data) {
		this.name = data.name;
		this.number = data.number;
		this.levels = data.levels;
	}
}