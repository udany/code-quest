import '../extend/Date';
import HasUniqueId from './HasUniqueId.js';

/**
 * Emitter class
 * @name Emitter
 * @property {Function} __autoEvents
 * @extends HasUniqueId
 */
export class Emitter extends HasUniqueId {
	constructor() {
		super();
		if (this.__autoEvents) {
			this.__autoEvents();
		}
	}

	on(event, fn, key, once) {
		if (!this.__boundEvents) {
			Object.defineProperty(this, '__boundEvents', {enumerable: false, writable: false, value: {}});
		}
		if (!this.__boundEvents[event]) this.__boundEvents[event] = [];

		this.__boundEvents[event].push({callback: fn, key: key, once: once});

		return this;
	}

	onAny(fn, key, once) {
		return this.on(Emitter.AnyEvent, fn, key, once);
	}

	off(event, fn) {
		if (!this.__boundEvents || !this.__boundEvents[event]) return this;

		if (fn instanceof Array) {
			for (let i = 0; i < fn.length; i++) {
				this.off(event, fn[i]);
			}
		} else if (fn) {
			let idx;

			if (fn.callback instanceof Function) {
				idx = this.__boundEvents[event].indexOf(fn);
			} else {
				fn = this.__boundEvents[event].filter((e) => e.key === fn);

				if (fn.length) {
					idx = this.__boundEvents[event].indexOf(fn[0]);
				}
			}

			if (idx >= 0) {
				this.__boundEvents[event].splice(idx, 1);
			}
		} else {
			this.__boundEvents[event] = [];
		}

		return this;
	}

	offAny(fn) {
		return this.off(Emitter.AnyEvent, fn);
	}

	emit(event, args) {
		if (!(args instanceof Array)) args = [args];

		if (this.__boundEvents && this.__boundEvents[event]) {
			let removeElements = [];

			let eventData = this.__boundEvents[event].concat([]);

			for (let i = 0; i < eventData.length; i++) {
				let data = eventData[i];
				data.callback.apply(this, args);
				if (data.once) removeElements.push(data);
			}

			this.off(event, removeElements);
		}
		if (event !== Emitter.AnyEvent && this.__boundEvents && this.__boundEvents[Emitter.AnyEvent]) {
			this.emit(Emitter.AnyEvent, ([event]).concat(args));
		}

		return this;
	}

	once(event, fn, key) {
		this.on(event, fn, key, true);

		return this;
	}
}

Emitter.AnyEvent = '*';

export default Emitter;