import {dbBacktick} from "./DatabaseModel";

export class DatabaseQueryComponent {
    getClause() {
        return '';
    }

    getParams() {
        return [];
    }
}

export class DatabaseQueryClause extends DatabaseQueryComponent {
    /**
     * @param {DatabaseQueryComponent[]} clauses
     * @param mode
     */
    constructor(clauses, mode = "OR") {
        super();

        /** @type {DatabaseQueryComponent[]} **/
        this.clauses = clauses || [];

        this.mode = mode;
    }

    getClause() {
        let clauses = this.clauses.map(c => `(${c.getClause()})`);

        return clauses.join(` ${this.mode} `);
    }

    getParams() {
        let params = {};
        this.clauses.forEach(c => Object.assign(params, c.getParams()));

        return params;
    }
}

export class DatabaseQueryCondition extends DatabaseQueryComponent {
    /**
     * @param {DatabaseQueryComponent[]} clauses
     * @param operator
     */
    constructor({
        column,
        values,
        operator = "=",
        mode = "OR",
        bound = true,
        boundParameter = '',
        escapeColumn = true
    }) {
        super();

        this.column = column;
        this.values = Array.isArray(values) ? values : [values];
        this.operator = operator;
        this.mode = mode;
        this.bound = bound;
        this.boundParameter = boundParameter;
        this.escapeColumn = escapeColumn;
    }

    getClause() {
        let clauses = [];

        for (let i = 0; i < this.values.length; i++) {
            let value;

            if (this.bound) {
                value = ':' + (this.boundParameter || this.column) + i;
            } else {
                value = this.values[i];
            }

            const column = this.escapeColumn ? dbBacktick(this.column) : this.column;

            clauses.push(`${column} ${this.operator} ${value}`);
        }

        return clauses.join(` ${this.mode} `)
    }

    getParams() {
        let params = {};

        for (let i = 0; i < this.values.length; i++) {
            const boundParameter = (this.boundParameter || this.column) + i;

            params[boundParameter] = this.values[i];
        }

        return params;
    }
}