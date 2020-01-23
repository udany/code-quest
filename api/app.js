import "../shared/base/extend";
import config from './config';

import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';


// APP
let app = express();

/// MIDDLEWARE
/// =CORS
let cors = require('cors');

let whitelist = config.cors;
let corsOptionsDelegate = function (req, callback) {
    var corsOptions;


    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {
            origin: true,
            credentials: true
        };
    } else {
        corsOptions = { origin: false };
    }


    callback(null, corsOptions) // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.options('*', cors());

/// =SESSION
let cookieSecret = 'the.world.is.quiet.here';
app.use(session({
	secret: cookieSecret,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false
	}
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'static')));
app.use('/data/', express.static('data'));

//Get parameter from run command
let parameter = process.argv.find(arg => arg.startsWith('env'));
if (!parameter) parameter = 'env=remote';

// Load all routes
let envs = parameter.split('=')[1].split(',');
let glob = require('glob');
let routeFiles =[];
for (let env of envs){
    let pattern = path.join(__dirname, 'routes', env, '*.js');
    routeFiles.push(...glob.sync(pattern));
}

for (let file of routeFiles) {
    let route = require(file).default;
    app.use(route.path, route.router);
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    res.send(`error ${err.status}: ${err.message}`);
});

module.exports = app;