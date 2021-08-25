import Entity from '../Entity';

function hue2rgb(p, q, t){
	if(t < 0) t += 1;
	if(t > 1) t -= 1;
	if(t < 1/6) return p + (q - p) * 6 * t;
	if(t < 1/2) return q;
	if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	return p;
}

function hsl2rgb([h, s, l, a = 1]) {
	let r, g, b;

	if (s === 0) {
		r = g = b = l; // achromatic
	} else {
		let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		let p = 2 * l - q;

		r = hue2rgb(p, q, h + 1/3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1/3);
	}

	r = Math.min(Math.floor(r*256),255);
	g = Math.min(Math.floor(g*256),255);
	b = Math.min(Math.floor(b*256),255);

	return [r, g, b, a];
}

function rgb2hsl([r, g, b, a]) {
	r /= 255;
	g /= 255;
	b /= 255;

	let max = Math.max(r, g, b),
		min = Math.min(r, g, b);

	let h, s, l = (max + min) / 2;

	if(max === min){
		h = s = 0; // achromatic
	} else {
		let d = (max - min);
		s = l >= 0.5 ? d / (2 - (max + min)) : d / (max + min);
		switch(max){
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
	}

	return [h/6, s, l, a];
}


/**
 * @name Color
 * @property {Number} r
 * @property {Number} g
 * @property {Number} b
 * @property {Number} a
 */
class Color extends Entity {
    toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    Serialize() {
        return [this.r, this.g, this.b, this.a];
    }

    FillFromArray(a) {
    	if (!a) return;

        if (a.r) {
            super.FillFromArray(a);
        } else {
            this.r = a[0];
            this.g = a[1];
            this.b = a[2];
            this.a = a[3];
        }
    }

	applyDelta(a) {
		if (!a) return;

		if (a.r) {
			super.applyDelta(a);
		} else {
			this.r = a[0];
			this.g = a[1];
			this.b = a[2];
			this.a = a[3];
		}
	}

    clone() {
    	return new this.constructor(this.Serialize());
    }

    fromHsl([h, s, l, a = 1]) {
	    let rgba = hsl2rgb([h, s, l, a]);

	    this.FillFromArray(rgba);

	    return this;
    }

    toHsl() {
    	let { r, g, b, a } = this;

	    return rgb2hsl([r, g, b, a]);
    }

    equals(other) {
	    return this.a === other.a
		    && this.r === other.r
		    && this.g === other.g
		    && this.b === other.b;
    }

    toHex(alpha = false) {
    	let array = this.toJSON().slice(0, 3);

    	if (alpha) {
    		array.push(Math.round(this.a * 255));
	    }

	    return Color.arrayToHex(array);
    }

    fillFromHex(hex) {
    	if (!Color.hexIsValid(hex)) return;

    	let values = Color.hexToArray(hex);

    	if (values.length === 4) {
		    values[3] = values[3] / 255;
	    } else {
		    values[3] = this.a;
	    }

    	this.FillFromArray(values);
    }

	/**
	 * @param {Number[]} values
	 * @return {String}
	 */
	static arrayToHex(values) {
    	return values
		    .map(v => v.toString(16).pad('0', 2))
		    .join('')
		    .toUpperCase();
    }

	/**
	 * @param {String} hex
	 * @return {Number[]}
	 */
	static hexToArray(hex) {
    	return hex.match(/[A-F0-9]{2}/g).map(v => parseInt(v, 16));
    }

	/**
	 * @param {String} hex
	 * @return {Boolean}
	 */
    static hexIsValid(hex) {
		let values = Color.hexToArray(hex);

		return values.length.isBetween(3,4) && values.every(v => v.isBetween(0, 255));
    }

	/**
     * Transitions between two colors
     * @param {Color} from
     * @param {Color} to
     * @param percent
     * @returns {Color}
     */
    static transition(from, to, percent) {
        // Calculate the deltas for each component
        let dR = Math.round((to.r - from.r) * percent);
        let dG = Math.round((to.g - from.g) * percent);
        let dB = Math.round((to.b - from.b) * percent);
        let dA = Math.round((to.a - from.a) * percent);

        return new Color({
            r: from.r + dR,
            g: from.g + dG,
            b: from.b + dB,
            a: from.a + dA
        });
    }

    /**
     * Transitions between N colors
     * @param {Color[]} colors
     * @param {Number} percent
     * @returns {Color}
     */
    static gradient(colors, percent) {
        let sectionSize = 1.01 / (colors.length - 1);

        let currentSection = Math.floor(percent / sectionSize);
        let currentProgress = (percent % sectionSize) / sectionSize;

        return this.transition(colors[currentSection], colors[currentSection + 1], currentProgress);
    }
}
Color.Register();
Color.Attributes = [
    new Entity.Attributes.Integer('r', false, 0),
    new Entity.Attributes.Integer('g', false, 0),
    new Entity.Attributes.Integer('b', false, 0),
    new Entity.Attributes.Float('a', false, 1)
];


/**
 * @name HslColor
 * @property {Number} h
 * @property {Number} s
 * @property {Number} l
 * @property {Number} a
 */
class HslColor extends Color {
	toString() {
		return `hsla(${this.h}turn, ${this.s*100}%, ${this.l*100}%, ${this.a})`;
	}

	Serialize() {
		return [this.h, this.s, this.l, this.a];
	}

	FillFromArray(a) {
		if (!a) return;

		if (a.h) {
			super.FillFromArray(a);
		} else {
			this.h = a[0];
			this.s = a[1];
			this.l = a[2];
			this.a = a[3];
		}
	}

	fromRgb([r, g, b, a = 1]) {
		let hsla = rgb2hsl([r, g, b, a]);

		this.FillFromArray(hsla);

		return this;
	}

	toRgb() {
		let { h, s, l, a } = this;

		return hsl2rgb([h, s, l, a]);
	}

	toHex(alpha = false) {
		let array = this.toRgb().slice(0, 3);

		if (alpha) {
			array.push(Math.round(this.a * 255));
		}

		return Color.arrayToHex(array);
	}

	fillFromHex(hex) {
		if (!Color.hexIsValid(hex)) return;

		let values = Color.hexToArray(hex);
		if (values.length === 4) {
			values[3] = values[3] / 255;
		} else {
			values[3] = this.a;
		}

		values = rgb2hsl(values);

		this.FillFromArray(values);
	}
}
HslColor.Register();
HslColor.Attributes = [
	new Entity.Attributes.Float('h', false, 0),
	new Entity.Attributes.Float('s', false, 0),
	new Entity.Attributes.Float('l', false, 0),
	new Entity.Attributes.Float('a', false, 1)
];

export {Color, HslColor};
export default Color;