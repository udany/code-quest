/*
 * Description: Base Entity Class
 * Version: 0.1
 * Author: Daniel Andrade
 * This code may not be reused without proper permission from its creator.
 */
import {Emitter} from './General';

/**
 * @name Entity
 * @static {ObjectEntityAttribute[]} Attributes
 * @extends Emitter
 */
export class Entity extends Emitter {
	constructor(a) {
		super();

		this.defineProperties();
		this.FillFromArray(a);
	}

	defineProperties() {
		let attributes = this.constructor.Attributes;
		for (let attr of attributes) {
			attr.define(this);
		}
	}

	FillFromArray(a) {
		if (!a) a = [];
		if (a instanceof Entity) a = a.Serialize();

		let attributes = this.constructor.Attributes;

		for (let i = 0; i < attributes.length; i++) {
			let attribute = attributes[i];
			let name = attribute.name;
			if (a.hasOwnProperty(name) || !this.hasOwnProperty(name)) {
				let val = a[name];
				if (typeof val === 'undefined') val = null;

				attribute.Set(this, val);
			}
		}

		if (a['__class']) {
			this.__class = a['__class'];
		}

		this.emit('fill');
	}

	GetAttribute(attr) {
		return this.constructor.GetAttribute(attr);
	}

	Get(attr) {
		if (attr.Get) {
			return attr.Get(this);
		} else if (attr instanceof Function) {
			return attr(this);
		} else {
			let thisAttr = this.GetAttribute(attr);
			if (thisAttr) {
				return thisAttr.Get(this);
			} else {
				return this[attr];
			}
		}
	}

	Set(attr, val) {
		if (attr.Set) {
			return attr.Set(this);
		} else if (attr instanceof Function) {
			return attr(this, val);
		} else {
			let thisAttr = this.GetAttribute(attr);
			if (thisAttr) {
				return thisAttr.Set(this, val);
			} else {
				this[attr] = val;
			}
		}
	}

	Serialize(safeOnly = false, fields = []) {
		let attributes = this.constructor.Attributes;

		let result = {};

		safeOnly = !!safeOnly;

		for (let i = 0; i < attributes.length; i++) {
			let attribute = attributes[i];
			if (!attribute.serialize()) continue;
			if (fields.length && fields.indexOf(attribute.name) === -1) continue;

			if (!safeOnly || attribute.safe()) {
				result[attribute.name] = attribute.Get(this, safeOnly);
			}
		}

		if (this.__class) {
			result['__class'] = this.__class;
		} else {
			result['__class'] = Entity.ClassMap.getClassName(this);
		}

		return result;
	}

	toJSON() {
		return this.Serialize();
	}

	/**
	 * Use's Serialize/FillFromArray to clone this object
	 * @constructor
	 */
	clone() {
		let data = JSON.parse(JSON.stringify(this.Serialize()));
		return Entity.FromPlainObject(data);
	}

	GetKey() {
		if (this.KeyName) {
			return this.Get(this.KeyName);
		} else {
			return this.Get(this.constructor.Attributes[0]);
		}
	}

	/**
	 * @param obj Entity
	 * @return boolean
	 */
	equals(obj) {
		return obj.GetKey() === this.GetKey();
	}

	equalsDeep(obj) {
		// return obj.Serialize() === this.Serialize();

		if (!obj) return false;

		let attributes = this.constructor.Attributes;

		for (let attr of attributes) {
			if (!attr.equals(this, obj)) return false;
		}

		return true;
	}

	delta(to) {
		let attributes = this.constructor.Attributes;
		let delta = {};

		for (let attr of attributes) {
			if (!attr.equals(this, to)) {
				delta[attr.name] = attr.delta(this, to);
			}
		}

		return delta;
	}

	applyDelta(delta) {
		let attributes = this.constructor.Attributes;

		for (let attr of attributes) {
			if (delta.hasOwnProperty(attr.name)) {
				attr.applyDelta(this, delta[attr.name]);
			}
		}
	}

	static Inherit(from) {
		this.AttributesInherit(from);
	}

	static AttributesInherit(from) {
		if (from) {
			let attr = from.Attributes;
			let thisAttr = this.Attributes || [];
			if (attr && thisAttr && attr.concat) thisAttr = attr.concat(thisAttr);

			this.Attributes = thisAttr;
		}
	}

	static GetAttribute(attr) {
		let r = this.Attributes.filter(function (e) {
			return e.name === attr;
		});

		if (r.length) {
			return r[0];
		} else {
			return null;
		}
	}

	static getName() {
		let name = this.name;
		if (this.namespace) name = this.namespace + '.' + name;

		return name;
	}

	static Register(name = '') {
		if (!name) name = this.getName();

		Entity.ClassMap.Register(this, name);
	}

	static FromPlainObject(a) {
		if (!a) {
			return null;
		}

		if (!a.__class) {
			throw 'Object doesn\'t describe it\'s class, make sure it contains a __class property';
		}

		let C = this.ClassMap.getClassFromName(a.__class);

		if (!(C instanceof Function)) {
			throw 'Couldn\'t locate class within current scope, make sure the script defining the class: ' + a.__class;
		}

		return new C(a);
	}

	static FromPlainObjectArray(array, entity) {
		let r = [];
		for (let i in array) {
			if (array.hasOwnProperty(i)) {
				if (entity) {
					r[i] = new entity(this[i]);
				} else {
					r[i] = Entity.FromPlainObject(this[i]);
				}
			}
		}

		return r;
	}
}

Entity.prototype.proxyArrayEvents = function (array, attr) {
	let uid = this.GetUId();

	array.onAny((e, ...args) => {
		this.emit('list-change', [e, attr, ...args]);
	}, uid);

	array.on('add', (...args) => {
		this.emit('list-add', [attr, ...args]);
	}, uid);

	array.on('remove', (...args) => {
		this.emit('list-remove', [attr, ...args]);
	}, uid);
};

Entity.prototype.unProxyArrayEvents = function (array) {
	let uid = this.GetUId();

	array.offAny(uid);

	array.off('add', uid);

	array.off('remove', uid);
};

Entity.ClassMap = {
	map: {},
	getClassName: function (o) {
		if (!(o instanceof Function)) o = o.constructor;
		return o.__class;
	},
	getClassFromName: function (name) {
		return this.map[name];
	},
	Register: function (fn, name) {
		if (!name) name = fn.name;
		fn.__class = name;
		this.map[name] = fn;
	}
};

/// Attributes

/// == Object
export class ObjectEntityAttribute {
	constructor(name) {
		this.name = name;

		this._safe = true;
		this._serialize = true;

		this._watchable = false;
	}

	define(obj) {
		let descriptor = {
			configurable: true,
			enumerable: true,
		};

		if (this.watchable()) {
			this.privateKey = '__' + this.name;

			Object.defineProperty(obj, this.privateKey, {
				configurable: true,
				enumerable: false,
				writable: true
			});

			let attribute = this;

			descriptor.get = function () {
				obj.emit('get', [attribute]);
				return obj[attribute.privateKey];
			};

			descriptor.set = function (newValue) {
				let oldValue = obj[attribute.privateKey];
				obj[attribute.privateKey] = newValue;

				obj.emit('set', [attribute, newValue, oldValue]);

				if (newValue instanceof Array) {
					obj.proxyArrayEvents(newValue, attribute);
				}

				if (oldValue instanceof Array) {
					obj.emit('list-remove', [attribute, oldValue]);
					obj.emit('list-add', [attribute, newValue]);
					obj.unProxyArrayEvents(oldValue);
				}
			};
		} else {
			descriptor.value = null;
			descriptor.writable = true;
		}

		Object.defineProperty(obj, this.name, descriptor);

		this.Set(obj, null);
	}

	_setOrReturnKey(key, val) {
		if (val !== null && typeof val !== 'undefined') {
			this[key] = val;

			return this;
		} else {
			return this[key];
		}
	}

	safe(val) {
		return this._setOrReturnKey('_safe', val);
	}

	serialize(val) {
		return this._setOrReturnKey('_serialize', val);
	}

	watchable(val) {
		return this._setOrReturnKey('_watchable', val);
	}

	Get(obj) {
		return obj[this.name];
	}

	Set(obj, val) {
		obj[this.name] = val;
	}

	compare(a, b) {
		if (this.Get(a) < this.Get(b)) {
			return -1;
		}

		if (this.Get(a) > this.Get(b)) {
			return 1;
		}

		return 0;
	}

	equals(a, b) {
		return this.Get(a) === this.Get(b);
	}

	delta(from, to) {
		return this.Get(to);
	}

	applyDelta(from, delta) {
		return this.Set(from, delta);
	}
}

/// == String
export class StringEntityAttribute extends ObjectEntityAttribute {
	nullable(val) {
		return this._setOrReturnKey('_nullable', val);
	}

	Get(obj) {
		return obj[this.name] === null ? (this.nullable() ? null : '') : obj[this.name].toString();
	}

	Set(obj, val) {
		obj[this.name] = val === null ? (this.nullable() ? null : '') : val.toString();
	}
}

/// == Formatted String
export class FormattedStringEntityAttribute extends StringEntityAttribute {
	format(val) {
		return this._setOrReturnKey('_format', val);
	}

	Set(obj, val) {
		if (this.format()) {
			val = this.format()(val);
		}

		obj[this.name] = val === null ? null : val.toString();
	}
}

/// == Integer
export class IntegerEntityAttribute extends ObjectEntityAttribute {
	constructor(name, nullable = false, def = 0) {
		super(name);
		this.nullable(!!nullable);
		this.def = def;
	}

	nullable(val) {
		return this._setOrReturnKey('_nullable', val);
	}

	Get(obj) {
		let val = parseInt(obj[this.name], 10);
		return isNaN(val) ? (this.nullable() ? null : this.def) : val;
	}

	Set(obj, val) {
		val = parseInt(val, 10);
		obj[this.name] = isNaN(val) ? (this.nullable() ? null : this.def) : val;
	}
}

/// == Float
export class FloatEntityAttribute extends IntegerEntityAttribute {
	Get(obj) {
		let val = parseFloat(obj[this.name]);
		return isNaN(val) ? (this.nullable ? null : this.def) : val;
	}

	Set(obj, val) {
		val = parseFloat(val);
		obj[this.name] = isNaN(val) ? (this.nullable ? null : this.def) : val;
	}
}

/// == Boolean
export class BooleanEntityAttribute extends IntegerEntityAttribute {
	Get(obj) {
		let val = obj[this.name];

		if (this.nullable()) {
			if (val === null) return null;
		}

		return !!val;
	}

	Set(obj, val) {
		if (this.nullable() && val === null) {
			obj[this.name] = null;
			return;
		}

		obj[this.name] = !!val;
	}
}

/// == Json
export class JsonEntityAttribute extends ObjectEntityAttribute {
	Get(obj) {
		return JSON.stringify(obj[this.name]);
	}

	Set(obj, val) {
		obj[this.name] = JSON.parse(val);
	}
}

/// == Array
export class ArrayEntityAttribute extends ObjectEntityAttribute {
	/**
	 * @param obj
	 * @returns {Array}
	 */
	Get(obj) {
		return obj[this.name];
	}

	Set(obj, val) {
		obj[this.name] = val && val instanceof Array ? val : [];
	}

	equals(a, b) {
		return JSON.stringify(this.Get(a)) === JSON.stringify(this.Get(b));
	}

	delta(from, to) {
		let fromV = this.Get(from);
		let toV = this.Get(to);

		let delta = {
			length: toV.length,
			changes: []
		};

		for (let i = 0; i < toV.length; i++) {
			let item = fromV[i];
			let newItem = toV[i];

			if (i >= fromV.length) {
				delta.changes.push([i, newItem])
			} else if (item !== newItem) {
				delta.changes.push([i, newItem])
			}
		}

		return delta;
	}

	applyDelta(from, delta) {
		let fromV = this.Get(from).slice(0, delta.length);

		for (let change of delta.changes) {
			fromV[change[0]] = change[1];
		}

		return this.Set(from, fromV);
	}
}

/// == Entity
export class EntityEntityAttribute extends ObjectEntityAttribute {
	constructor(name, defaultEntity, encodeAsJson = false) {
		super(name);
		this.defaultEntity = defaultEntity;
		this.encodeAsJson = !!encodeAsJson;

		this._default = null;
	}

	default(val) {
		return this._setOrReturnKey('_default', val);
	}

	/**
	 * @param obj
	 * @param safeOnly
	 * @returns {Entity | null}
	 * @constructor
	 */
	Get(obj, safeOnly) {
		let a = obj[this.name] ? obj[this.name].Serialize(!!safeOnly) : this.default();

		return this.encodeAsJson ? JSON.stringify(a) : a;
	}

	Set(obj, val) {
		let dataArray = typeof val === 'string' ? JSON.parse(val) : val;

		if (!val) dataArray = this.default();

		if (this.defaultEntity) {
			obj[this.name] = dataArray ? new this.defaultEntity(dataArray) : null;
		} else {
			obj[this.name] = dataArray ? Entity.FromPlainObject(dataArray) : null;
		}
	}

	equals(a, b) {
		if (!a[this.name] || !b[this.name]) return a[this.name] === b[this.name];

		return a[this.name].equalsDeep(b[this.name]);
	}

	delta(from, to) {
		let fromV = from[this.name];
		let toV = to[this.name];

		return fromV ? fromV.delta(toV) : toV.Serialize();
	}

	applyDelta(from, delta) {
		if (from[this.name]) {
			from[this.name].applyDelta(delta);
		} else {
			this.Set(from, delta);
		}
	}
}

/// == EntityList
export class EntityListEntityAttribute extends EntityEntityAttribute {
	Get(obj, safeOnly) {
		let a = obj[this.name];

		let r = a.map(x => x.Serialize(!!safeOnly));

		return this.encodeAsJson ? JSON.stringify(r) : r;
	}

	Set(obj, val) {
		let dataArray = typeof val === 'string' ? JSON.parse(val) : val;
		if (!dataArray) dataArray = [];

		dataArray = dataArray.map(x => {
			if (this.defaultEntity) {
				return new this.defaultEntity(x);
			} else {
				return Entity.FromPlainObject(x);
			}
		});

		obj[this.name] = dataArray;
	}

	equals(a, b) {
		/** @var {Entity[]} fromV **/
		let aV = a[this.name];
		/** @var {Entity[]} fromV **/
		let bV = b[this.name];

		if (aV.length !== bV.length) return false;

		for (let i = 0; i < aV.length; i++) {
			let aI = aV[i];
			let bI = bV[i];

			if (!aI.equalsDeep(bI)) {
				return false;
			}
		}

		return true;
	}

	delta(from, to) {
		/** @var {Entity[]} fromV **/
		let fromV = from[this.name];
		/** @var {Entity[]} fromV **/
		let toV = to[this.name];

		// Single letter variables were used to minimize delta serialized length
		let delta = {
			// Length
			l: toV.length,
			// Change list
			c: []
		};

		for (let i = 0; i < toV.length; i++) {
			let item = fromV[i];
			let newItem = toV[i];

			if (i >= fromV.length) {
				delta.c.push([i, newItem.Serialize()])
			} else if (!item.equalsDeep(newItem)) {
				delta.c.push([i, item.delta(newItem)])
			}
		}

		return delta;
	}

	applyDelta(from, delta) {
		/** @var {Entity[]} fromV **/
		let fromV = from[this.name].slice(0, delta.l);

		for (let change of delta.c) {
			let idx = change[0];
			let val = change[1];

			if (idx < fromV.length) {
				fromV[idx].applyDelta(val);
			} else {
				if (this.defaultEntity) {
					val = new this.defaultEntity(val);
				} else {
					val = Entity.FromPlainObject(val);
				}

				fromV[idx] = val;
			}
		}

		from[this.name] = fromV;
	}
}

/// == Date
export class DateEntityAttribute extends ObjectEntityAttribute {
	constructor(name, unix, absolute) {
		super(name);
		this.unix = !!unix;
		this.absolute = !!absolute;
	}

	Get(obj) {
		if (obj[this.name] instanceof Date) {
			if (!this.unix) return obj[this.name];

			if (this.absolute) {

				let dt = new Date(obj[this.name].getTime());
				dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());

				return Math.floor(dt.getTime() / 1000);

			} else {
				return Math.floor(obj[this.name].getTime() / 1000);
			}
		} else {
			return null;
		}
	}

	Set(obj, val) {
		if (val instanceof Date) {
			obj[this.name] = val;
		} else {
			if (typeof val === 'string') {
				let intval = Date.parse(val);
				if (!isNaN(intval)) {
					val = intval;
				} else {
					val = parseInt(val, 10) * 1000;
				}
			} else {
				val *= 1000;
			}

			if (val !== null && !isNaN(val)) {
				let dt = new Date(val);

				if (this.absolute) {
					dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
				}

				obj[this.name] = dt;
			} else {
				obj[this.name] = null;
			}
		}
	}
}

/// == Custom
export class CustomEntityAttribute extends ObjectEntityAttribute {
	constructor(name, type, get, set) {
		super(name);
		this.type = type;
		this.getFn = get;
		this.setFn = set;
	}

	Get(obj) {
		return this.getFn(obj);
	}

	Set(obj, val) {
		if (this.setFn) {
			this.setFn(obj, val);
		}
	}
}

/// == Enum
export class EnumEntityAttribute extends ObjectEntityAttribute {
	/**
	 * @param name
	 * @param {Enum} enumObj
	 * @param key
	 * @constructor
	 */
	constructor(name, enumObj, key = 'value') {
		super(name);
		this.name = name;
		this.enum = enumObj;
		this.key = key;
		this.default = null;
	}

	Get(obj) {
		let val = obj[this.name];

		if (val && val.hasOwnProperty(this.key)) {
			return val[this.key];
		}

		return this.default;
	}

	Set(obj, val) {
		obj[this.name] = this.enum.getByProperty(this.key, val);
	}
}

/// == Flags
export class FlagsEntityAttribute extends ObjectEntityAttribute {
	/**
	 * @param name
	 * @param {Enum} enumObj
	 * @param key
	 * @constructor
	 */
	constructor(name, enumObj, key = 'value') {
		super(name);
		this.name = name;
		this.enum = enumObj;
		this.key = key;
		this.default = null;
	}

	Get(obj) {
		let val = obj[this.name];

		if (val instanceof Array) {
			return val.reduce((v, item) => v | item[this.key], 0);
		}

		return 0;
	}

	Set(obj, val) {
		obj[this.name] = this.enum.listByProperty((x) => x[this.key] & val);
	}
}

Entity.Attributes = {};
Entity.Attributes.Object = ObjectEntityAttribute;
Entity.Attributes.String = StringEntityAttribute;
Entity.Attributes.FormattedString = FormattedStringEntityAttribute;
Entity.Attributes.Integer = IntegerEntityAttribute;
Entity.Attributes.Float = FloatEntityAttribute;
Entity.Attributes.Boolean = BooleanEntityAttribute;
Entity.Attributes.Json = JsonEntityAttribute;
Entity.Attributes.Array = ArrayEntityAttribute;
Entity.Attributes.Entity = EntityEntityAttribute;
Entity.Attributes.EntityList = EntityListEntityAttribute;
Entity.Attributes.Date = DateEntityAttribute;
Entity.Attributes.Custom = CustomEntityAttribute;
Entity.Attributes.Enum = EnumEntityAttribute;
Entity.Attributes.Flags = FlagsEntityAttribute;

// EntityMap
Entity.Attributes.EntityMap = function (name, encodeAsJson) {
	this.name = name;
	this.encodeAsJson = !!encodeAsJson;
};
Entity.Attributes.EntityMap.prototype.Get = function (obj) {
	let a = obj[this.name];
	let r = [];
	for (let i in a) {
		if (a.hasOwnProperty(i)) {
			let e = a[i];
			r[i] = e.Serialize();
		}
	}
	return this.encodeAsJson ? JSON.stringify(r) : r;
};
Entity.Attributes.EntityMap.prototype.Set = function (obj, val) {
	let a = this.encodeAsJson ? JSON.parse(val) : val;
	if (!a) a = [];
	let r = [];
	for (let i in a) {
		if (a.hasOwnProperty(i)) {
			let e = a[i];
			r[i] = Entity.FromPlainObject(e);
		}
	}
	obj[this.name] = r;
};


export default Entity;
