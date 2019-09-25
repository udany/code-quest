// ARRAYS //
import {Emitter} from '../General'

if (Object.getOwnPropertyDescriptor(Array.prototype, 'push').writable) {
	// Makes array an event emitter
	Object.assign(Array.prototype, Emitter.prototype);

	// Utility functions
	Array.prototype.selfConcat = function () {
		for (let i = 0; i < arguments.length; i++) {
			let a = arguments[i];
			if (a instanceof Array) {
				this.push.apply(this, a);
			}
		}
	};

	Array.prototype.last = function () {
		return this[this.length-1];
	};

	Array.prototype.move = function (from, to) {
		this.splice(to, 0, this.splice(from, 1)[0]);
	};

	Array.prototype.remove = function (...elements) {
		elements.forEach(e => {
			let idx = this.indexOf(e);
			if (idx >= 0) {
				this.splice(idx, 1);
			}
		});

		return this;
	};

	Array.prototype.flatten = function () {
		return this.reduce(function (flat, toFlatten) {
			return flat.concat(Array.isArray(toFlatten) ? toFlatten.flatten() : toFlatten);
		}, []);
	};

	Array.prototype.unique = function () {
		if (arguments.length === 0) {
			return !!this._unique;
		} else {
			this._unique = arguments[0];
		}
	};

	if (!Array.prototype.super_push) {
		Array.prototype.super_push = Array.prototype.push;
		Array.prototype.push = function (...items) {
			if (this.unique()) {
				let i = 0;
				while (i < items.length) {
					let item = items[i];
					if (this.indexOf(item) >= 0) {
						items.splice(i, 1);
					} else {
						i++;
					}
				}
			}

			this.emit('add', [items]);

			return this.super_push(...items);
		};

		Array.prototype.super_splice = Array.prototype.splice;
		Array.prototype.splice = function (...args) {
			let removed = this.super_splice(...args);

			if (removed.length) {
				this.emit('remove', [removed]);
			}

			return removed;
		};
	}

	Array.prototype.insertAt = function (index, value) {
		this.splice(index, 0, value);

		this.emit('add', [[value]]);

		return this;
	};

	Array.prototype.shuffle = function () {
		for (let i = this.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this[i], this[j]] = [this[j], this[i]];
		}

		return this;
	};

	Array.prototype.randomElement = function () {
		return this[Math.floor(Math.random() * this.length)];
	};

	for (let k in Array.prototype) {
		if (Array.prototype.hasOwnProperty(k)) {
			Object.defineProperty(Array.prototype, k, {enumerable: false, writable: true});
		}
	}
}
