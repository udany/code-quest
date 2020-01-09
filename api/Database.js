import cfg from './config';
import mysql from 'mysql2/promise';

const queryFormat = function (query, values) {
	if (!values) return query;
	return query.replace(/:(\w+)/g, function (txt, key) {
		if (values.hasOwnProperty(key)) {
			return this.escape(values[key]);
		}
		return txt;
	}.bind(this));
};

let db = {
    _connPromise: null,
    conn: null,
    async start() {
        let resolve;
        this._connPromise = new Promise((resolveF, reject) => {
            resolve = resolveF;
        });

        this.conn = await mysql.createPool({
	        ...cfg.mysql,
	        queryFormat
        });

        resolve();
    }
};

db.start();


db = new Proxy(db, {
    get: function(obj, prop) {
        if (obj.hasOwnProperty(prop)){
            return obj[prop];
        } else if (obj.conn && obj.conn[prop]) {
            return obj.conn[prop];
        } else if (!obj.conn) {
            return async function (...args) {
                await obj._connPromise;
                return obj.conn[prop](...args);
            };
        }

        return null;
    }
});

export default db;