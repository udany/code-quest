import {setOrReturnKey} from '../../shared/base/General';
import {DatabaseQueryClause, DatabaseQueryComponent, DatabaseQueryCondition} from "./DatabaseQueryComponent";

export function dbBacktick(val) {
    return `\`${val}\``;
}

const _e = dbBacktick;


export class DatabaseModel {
    static config({
        table,
        entity = null,
        fields = [],
        relationships = [],
        insertWithId = false,
	    updateOnDuplicate = false
    }) {
        this.table = table;
        this.entity = entity;

        /** @type {DatabaseField[]} */
        this.fields = fields;

        this.relationships = relationships;

	    this._insertWithId = insertWithId;
	    this._updateOnDuplicate = updateOnDuplicate;

        return this;
    }

    static insertWithId(v) {
        return this._setOrReturnKey('_insertWithId', v);
    }

	static updateOnDuplicate(v) {
		return this._setOrReturnKey('_updateOnDuplicate', v);
	}

    // Main Operations

	/**
     *
	 * @param db DatabaseInstance
	 * @param obj Entity instance
	 * @param {String[]} allowedFields List of allowed fields
	 * @param {Boolean} insert Weather insert is to be forced
	 * @returns {Promise<*>}
	 */
    static async save(db, obj, allowedFields = [], insert = false) {
        const pks = this.primaryKeys();
        const exists = pks.reduce((v, pk) => v && obj[pk.name], true);

        const fields = this.fields.filter(f => !allowedFields.length || allowedFields.indexOf(f.name) >= 0 || pks.indexOf(f) >= 0);

        const data = fields.reduce((d, f) => {
            d[f.name] = f.get(obj);
            return d;
        }, {});

        if (insert || !exists || this.updateOnDuplicate()) {
            const query = this.getInsertQuery(data);

            const result = await db.query(query, data);
            const [insertData] = result;

            if (!this.insertWithId()) {
                if (insertData.insertId) {
                    const aiPk = pks.find(x => x.autoIncrement);
                    if (aiPk) {
                        aiPk.set(obj, insertData.insertId);
                    }
                }
            }

            await this.saveRelationships(db, obj);

            return result;
        } else {
            const query = this.getUpdateQuery(data);

            let result = await db.query(query, data);

            await this.saveRelationships(db, obj);

            return result;
        }
    }

    /**
     * Queries the database for entries
     * @param db
     * @param {DatabaseQueryComponent[]|Object[]} filters
     * @param {String} order
     * @param {String[]} fieldNames
     * @returns {Entity[]}
     */
    static async select(db, filters = [], order = '', fieldNames = []) {
        if (!filters.length) {
            filters.push(new DatabaseQueryCondition({
                values: 1,
                column: 1,
                bound: false,
                escapeColumn: false
            }));
        }

        filters = filters.map(f => f instanceof DatabaseQueryComponent ? f : new DatabaseQueryCondition(f));

        const where = new DatabaseQueryClause(filters, "AND");

        const query = this.getSelectQuery(where, fieldNames, order);
        const params = where.getParams();

        let [rows] = await db.query(query, params);

        return this.entity ? rows.map(r => new this.entity(r)) : rows;
    }

    static async getById(db, id) {
        if (!Array.isArray(id)) id = [id];

        const pks = this.primaryKeys();
        let filters = [];

        for (let [index, field] of pks.entries()) {
            filters.push({
                column: field.name,
                values: id[index]
            });
        }

        let result = await this.select(db, filters);

        if (result.length) {
            result = result[0];

            await this.selectRelationships(db, result);

            return result;
        }

        return null;
    }

    static async deleteByModel(db, obj) {
	    const pks = this.primaryKeys();

	    const id = [];

	    for (const pk of pks) {
		    id.push(obj[pk.name]);
	    }

	    return this.deleteById(db, id);
    }

    static async deleteById(db, id) {
	    const pks = this.primaryKeys();

        if (!Array.isArray(id)) id = [id];

        let filters = [];

        for (let [index, field] of pks.entries()) {
            filters.push({
                column: field.name,
                values: id[index]
            });
        }

        return this.delete(db, filters);
    }

    static async delete(db, filters) {
        filters = filters.map(f => f instanceof DatabaseQueryComponent ? f : new DatabaseQueryCondition(f));

        const where = new DatabaseQueryClause(filters, "AND");

        const query = this.getDeleteQuery(where);
        const params = where.getParams();

        let [data] = await db.query(query, params);

        return !!data.affectedRows;
    }


    // QUERIES

    /**
     * Returns the select query with the given params
     * @param {DatabaseQueryComponent} where
     * @param {String[]} fieldNames
     * @returns {string}
     */
    static getSelectQuery(where = null, fieldNames = [], order = '') {
        const fields = this.fields.filter(f => !fieldNames.length || fieldNames.indexOf(f.name) >= 0);

        const columns = fields.map(f => _e(f.name));

        if (!where) {
            where = new DatabaseQueryCondition({
                values: 1,
                column: 1,
                bound: false,
                escapeColumn: false
            });
        }

        if (order) {
            order = order.replace('ORDER BY ', '');
            order = 'ORDER BY '+order;
        }

        return `SELECT ${columns.join(', ')} FROM ${_e(this.table)} WHERE ${where.getClause()} ${order}`;
    }

    static getInsertQuery(data) {
        const pks = this.primaryKeys();
        data = JSON.parse(JSON.stringify(data));

        if (!this.insertWithId()) {
            pks.forEach(pk => {
                delete data[pk.name];
            });
        }

        let keys = [];
        let values = [];

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                keys.push(_e(key));
                values.push(':' + key);
            }
        }

        let query = `INSERT INTO ${_e(this.table)} (${keys.join(', ')}) VALUES (${values.join(', ')})`;

        if (this.updateOnDuplicate()) {
	        let sets = [];

	        for (let key in data) {
		        if (data.hasOwnProperty(key)) {
			        sets.push(`${_e(key)} = :${key}`);
		        }
	        }

        	query += `\n  ON DUPLICATE KEY UPDATE  ${sets.join(', ')}`;
        }

        return query;
    }

    static getUpdateQuery(data) {
        const pks = this.primaryKeys();
        data = JSON.parse(JSON.stringify(data));

        let idData = {};

        pks.forEach(pk => {
            idData[pk.name] = data[pk.name];
            delete data[pk.name];
        });

        let sets = [];
        let where = [];

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                sets.push(`${_e(key)} = :${key}`);
            }
        }

        for (let key in idData) {
            if (idData.hasOwnProperty(key)) {
                where.push(`${_e(key)} = :${key}`);
            }
        }

        return `UPDATE ${_e(this.table)} SET ${sets.join(', ')} WHERE ${where.join(' AND ')}`;
    }

    static getDeleteQuery(where) {
        if (!where) {
            throw "Good luck erasing the db, not on my watch";
        }

        return `DELETE FROM ${_e(this.table)} WHERE ${where.getClause()}`;
    }

    static getCreateStatement() {
        let lines = [];

        for (let field of this.fields) {
            let line = `    ${_e(field.column)} ${field.getTypeString()} ${field.nullable ? 'NULL' : 'NOT NULL'}`;

            if (field.defaultValue !== null) line += ` DEFAULT ${field.getDefaultValue()}`;

            if (field.autoIncrement) line += ' AUTO_INCREMENT';

            lines.push(line);
        }

        let primaryKeys = this.primaryKeys().map(f => _e(f.name));

        lines.push(`    PRIMARY KEY (${primaryKeys.join(', ')})`);

        return `CREATE TABLE ${_e(this.table)} (\n${lines.join(',\n')}\n) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;`;
    }

    static primaryKeys() {
        return this.fields.filter(f => f.primaryKey);
    }

    static comparePrimaryKeys(obj1, obj2) {
	    const pks = this.primaryKeys();

	    for (let pk of pks) {
	        if (obj1[pk.name] !== obj2[pk.name]) {
	            return false;
            }
        }

        return true;
    }


    // Relationships

    static async selectRelationships(db, obj, relationships = null) {
        if (!relationships) relationships = this.relationships.filter(r => r.autoload());

        for (const relationship of relationships) {
            await relationship.select(db, obj);
        }
    }

    static async saveRelationships(db, obj, relationships = null) {
        if (!relationships) relationships = this.relationships.filter(r => !r.readonly());

        for (const relationship of relationships) {
            await relationship.save(db, obj);
        }
    }
}

DatabaseModel._setOrReturnKey = setOrReturnKey;


export class DatabaseField {
    constructor(options) {
        this.name = '';
        this.type = '';
        this.length = 0;
        this.unsigned = false;
        this.nullable = false;
        this.defaultValue = null;
        this.autoIncrement = false;
        this.primaryKey = false;
        this.unique = false;

        /** @type {Function} */
        this.getFunction = null;
        /** @type {Function} */
        this.setFunction = null;

        if (options) Object.assign(this, options);

        this.column = this.column ? this.column : this.name;
    }

    setType(v) {
        return this._setOrReturnKey('type', v);
    }

    setPrimaryKey(v) {
        return this._setOrReturnKey('primaryKey', v);
    }

    setUnsigned(v) {
        return this._setOrReturnKey('unsigned', v);
    }

    setNullable(v) {
        return this._setOrReturnKey('nullable', v);
    }

    setLength(v) {
        return this._setOrReturnKey('length', v);
    }

    setDefault(v) {
        return this._setOrReturnKey('defaultValue', v);
    }

    setAutoIncrement(v) {
        return this._setOrReturnKey('autoIncrement', v);
    }

    setUnique(v) {
        return this._setOrReturnKey('unique', v);
    }

    baseGet(o) {
        return o[this.name];
    }

    baseSet(o, val) {
        o[this.name] = val;
    }

    get (o) {
        return this.getFunction ? this.getFunction(o) : this.baseGet(o);
    }

    set (o, val) {
        return this.setFunction ? this.setFunction(o, val) : this.baseSet(o, val);
    }

    getTypeString() {
        return this.type + (this.length ? `(${this.length})` : '') + (this.unsigned ? ' unsigned' : '')
    }

    getDefaultValue() {
        if (typeof this.defaultValue === 'string') {
            return `"${this.defaultValue}"`;
        } else {
            return this.defaultValue;
        }
    }
}

export class DatabaseFieldBoolean extends DatabaseField {
    baseGet(o) {
        return o[this.name] ? 1 : 0;
    }

    baseSet(o, val) {
        o[this.name] = !!val;
    }
}

DatabaseField.prototype._setOrReturnKey = setOrReturnKey;