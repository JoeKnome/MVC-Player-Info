var controllers = require('./controllers');
var mid = require('./middleware');

// connect routes
var router = function(app) {
	app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
	app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
	app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
	app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
	app.get('/logout', mid.requiresLogin, controllers.Account.logout);
	app.get('/app', mid.requiresLogin, controllers.Account.app);
	app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;