import Entity from '../Entity';

/**
 * @name Vector
 * @property {Number} x
 * @property {Number} y
 * @property {Number} z
 */
export class Vector extends Entity {
	/**
	 * @param {...number|Vector|{x: number, y: number, [z]: number}} values
	 * @returns {Vector} itself
	 */
    add(...values) {
        if (
        	values.length === 1 &&
	        values[0].hasOwnProperty('x') &&
	        values[0].hasOwnProperty('y')
        ) {
            return this.add(values[0].x, values[0].y, values[0].z);
        } else {
            this.x += values[0];
	        this.y += values[1];
	        if (values[2] !== undefined) this.z += values[2];
        }

        return this;
    }

	/**
	 * @param {...number|Vector|{x: number, y: number, [z]: number}} ratios
	 * @returns {Vector} itself
	 */
	scale(...ratios) {
	    if (
		    ratios.length === 1 &&
		    ratios[0].hasOwnProperty('x') &&
		    ratios[0].hasOwnProperty('y')
	    ) {
		    return this.scale(ratios[0].x, ratios[0].y, ratios[0].z);
	    }

    	if (ratios.length === 1) {
		    this.x *= ratios[0];
		    this.y *= ratios[0];
		    this.z *= ratios[0];
	    } else {
		    this.x *= ratios[0];
		    this.y *= ratios[1];
		    if (ratios[2] !== undefined) this.z *= ratios[2];
	    }

        return this;
    }

	/**
	 *
	 * @param {Number[][]} matrix 2x2 or 3x3 transformation matrix
	 */
	transform(matrix) {
		if (matrix[0].length === 2) {
			matrix[0][2] = 0;
			matrix[1][2] = 0;
			matrix[2][2] = 1;
		}

		return new Vector([
			(this.x * matrix[0][0]) + (this.y * matrix[0][1]) + (this.z * matrix[0][2]),
			(this.x * matrix[1][0]) + (this.y * matrix[1][1]) + (this.z * matrix[1][2]),
			(this.x * matrix[2][0]) + (this.y * matrix[2][1]) + (this.z * matrix[2][2]),
		])
    }

	rotateX(angle) {
		return this.transform([
			[1, 0, 0],
			[0, Math.cos(angle), -Math.sin(angle)],
			[0, Math.sin(angle), Math.cos(angle)],
		]);
	}

	rotateY(angle) {
		return this.transform([
			[Math.cos(angle), 0, Math.sin(angle)],
			[0, 1, 0],
			[-Math.sin(angle), 0, Math.cos(angle)],
		]);
	}

	rotateZ(angle) {
		return this.transform([
			[Math.cos(angle), -Math.sin(angle), 0],
			[Math.sin(angle), Math.cos(angle), 0],
			[0, 0, 1],
		]);
	}

	/**
	 * @param {number[]|Vector|{x: number, y: number, [z]: number}} a
	 * @returns {Vector} itself
	 */
    set(a) {
    	this.FillFromArray(a);

    	return this;
    }

    Serialize() {
        return [this.x, this.y, this.z];
    }

    FillFromArray(a) {
        if (a.hasOwnProperty('x')) {
            this.x = a.x;
	        this.y = a.y;
	        this.z = a.z !== undefined ? a.z : 0;
        } else {
            this.x = a[0];
            this.y = a[1];
	        this.z = a[2] !== undefined ? a[2] : 0;
        }
    }
}

Vector.Register();
Vector.Attributes = [
    new Entity.Attributes.Float('x'),
    new Entity.Attributes.Float('y'),
	new Entity.Attributes.Float('z')
];

export default Vector;