//{ requires
var path = require('path');
var express = require('express');
var compression = require('compression');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var url = require('url');
var csrf = require('csurf');
//} requires

// connect to database
var dbURL = process.env.MONGOLAB_URI || "mongodb://localhost/MVC-Player-Info";
var db = mongoose.connect(dbURL, function(err) {
	if(err) {
		console.log("Could not connect to database.");
		throw err;
	}
});

var redisURL = {
	hostname: 'localhost',
	port: 6379
};

var redisPASS;

if(process.env.REDISCLOUD_URL) {
	redisURL = url.parse(process.env.REDISCLOUD_URL);
	redisPASS = redisURL.auth.split(":")[1];
}

// pull in routes
var router = require('./router.js');
var port = process.env.PORT || process.env.NODE_PORT || 3000;

// setup app
var app = express();
app.use('/assets', express.static(path.resolve(__dirname + '/../client')));
app.use(compression());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(session({
	key: "sessionid",
	store: new RedisStore({
		host: redisURL.hostname,
		port: redisURL.port,
		pass: redisPASS
	}),
	secret: 'Sparkly Gems',
	resave: true,
	saveUninitialized: true,
	cookie: {
		httpOnly: true
	}
}));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(favicon(__dirname + '/../client/img/favicon.png'));
app.disable('x-powered-by');
app.use(cookieParser());

app.use(csrf());
app.use(function(err, req, res, next) {
	if(err.code !== 'EBADCSRFTOKEN') return next(err);
		
	return;
});

router(app);

app.listen(port, function(err) {
	if(err) {
		throw err;
	}
	console.log('Listening on port ' + port);
});