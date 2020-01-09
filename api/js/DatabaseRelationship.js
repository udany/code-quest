import {setOrReturnKey} from '../../shared/base/General';
import {DatabaseQueryCondition} from './DatabaseQueryComponent';

/**
 * @name DatabaseRelationship
 *
 * @property {Function} model The model
 * @property {Function} externalModel The external model
 *
 * @property {string} property The property the relationship is stored within the current model
 *
 * @property {string} localKey A field that identifies the current model within itself
 * @property {string} localForeignKey A field that identifies the current model within the external model
 *
 * @property {string} externalKey A field that identifies the external model within itself
 * @property {string} externalForeignKey A field that identifies the external model within the current model
 *
 * @property {Boolean} _readOnly Means the current relationship will only ever query data and never attempt to update it automatically
 * @property {Boolean} _autoload Means the current relationship will always be queried when querying it's own model
 *
 * @property {DatabaseQueryCondition[]|Object[]} filters Filters to apply when querying the relationship
 * @property {string} order Order clause to be used when querying the relationship
 */
export class DatabaseRelationship {
	constructor({
		            model,
		            externalModel,

		            property,

		            localKey = '',
		            localForeignKey = '',

		            externalKey = '',
		            externalForeignKey = '',

		            readOnly = true,
		            autoload = false,

		            filters = [],
		            order = ''
	            }) {
		this.model = model;
		this.externalModel = externalModel;

		this.property = property;

		this.localKey = localKey;
		this.localForeignKey = localForeignKey;

		this.externalKey = externalKey;
		this.externalForeignKey = externalForeignKey;

		this._readOnly = readOnly;
		this._autoload = autoload;

		this.filters = filters;
		this.order = order;
	}

	async query(db, obj) {
	}

	async select(db, obj) {
	}

	async selectMany(db, objs) {
	}

	async save(db, obj) {
	}

	readonly(v) {
		return this._setOrReturnKey('_readOnly', v)
	}

	autoload(v) {
		return this._setOrReturnKey('_autoload', v)
	}

	setFilters(f) {
		this.filters = f;
		return this;
	}

	setOrder(o) {
		this.order = o;
		return this;
	}
}

DatabaseRelationship.prototype._setOrReturnKey = setOrReturnKey;


export class DatabaseRelationshipOneToMany extends DatabaseRelationship {
	constructor({
		            model,
		            externalModel,
		            property,
		            localKey = 'id',
		            localForeignKey
	            }) {
		super({model, externalModel, property, localKey, localForeignKey})
	}

	async query(db, obj) {
		const id = obj[this.localKey];

		const filters = this.filters.concat([
			new DatabaseQueryCondition({
				column: this.localForeignKey,
				values: id
			})
		]);

		return this.externalModel.select(db, filters, this.order);
	}

	async select(db, obj) {
		const result = await this.query(db, obj);

		obj[this.property] = result;

		return result;
	}

	async save(db, obj) {
		let id = obj[this.localKey];
		let data = obj[this.property];

		for (const item of data) {
			item[this.localForeignKey] = id;

			await this.externalModel.save(db, item);
		}

		let list = await this.query(db, obj);
		let deleted = list.filter(element => !data.find(x => this.externalModel.comparePrimaryKeys(x, element)));

		for (const item of deleted) {
			await this.externalModel.deleteByModel(db, item);
		}
	}
}


/**
 * @name DatabaseRelationshipManyToMany
 * @extends DatabaseRelationship
 *
 * @property {Function} intermediaryModel The intermediary model between both models
 *
 * @property {string} localKey A field that identifies the current model within itself
 * @property {string} localForeignKey A field that identifies the current model within the intermediary model
 *
 * @property {string} externalKey A field that identifies the external model within itself
 * @property {string} externalForeignKey A field that identifies the external model within the intermediary model
 */
export class DatabaseRelationshipManyToMany extends DatabaseRelationship {
	constructor({
		            model,
		            intermediaryModel,
		            externalModel,
		            property,
		            localKey = 'id',
		            localForeignKey,
		            externalKey = 'id',
		            externalForeignKey
	            }) {
		super({
			model,
			externalModel,
			property,

			localKey,
			localForeignKey,

			externalKey,
			externalForeignKey
		});

		this.intermediaryModel = intermediaryModel;
	}

	async select(db, obj) {
		const id = obj[this.localKey];

		let filters = [
			new DatabaseQueryCondition({
				column: this.localForeignKey,
				values: id
			})
		];

		const intermediaryResult = await this.intermediaryModel.select(db, filters);

		if (!intermediaryResult.length) return [];

		const externalIds = intermediaryResult.map(r => r[this.externalForeignKey]);

		filters = this.filters.concat([
			new DatabaseQueryCondition({
				column: this.externalKey,
				operator: 'IN',
				values: `(${externalIds.join(', ')})`,
				bound: false
			})
		]);

		const result = await this.externalModel.select(db, filters, this.order);

		obj[this.property] = result;

		return result;
	}

	async save(db, obj) {
		const id = obj[this.localKey];
		const data = obj[this.property];

		let intermediaryData = data.map(d => {
			let obj = {};

			obj[this.localForeignKey] = id;
			obj[this.externalForeignKey] = d[this.externalKey];

			return obj;
		});

		if (this.intermediaryModel.entity) intermediaryData = intermediaryData.map(d => new this.intermediaryModel.entity(d));

		let filters = [
			new DatabaseQueryCondition({
				column: this.localForeignKey,
				values: id
			})
		];

		await this.intermediaryModel.delete(db, filters);

		for (const item of intermediaryData) {
			await this.intermediaryModel.save(db, item, [], true);
		}
	}
}