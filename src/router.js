var controllers = require('./controllers');
var mid = require('./middleware');

// connect routes
var router = function(app) {
	app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
	app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
	app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
	app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
	app.post('/editPlayer', mid.requiresSecure, mid.requiresLogin, controllers.Account.editPlayer);
	app.get('/logout', mid.requiresLogin, controllers.Account.logout);
	app.get('/game', mid.requiresLogin, controllers.Game.gamePage);
	app.get('/profile', mid.requiresLogin, controllers.Game.profilePage);
	app.get('/about', controllers.Game.aboutPage);
	app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;