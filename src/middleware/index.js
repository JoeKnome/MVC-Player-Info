// checks if the user is logged in
var requiresLogin = function(req, res, next) {
	if(!req.session.account) {
		// reroutes to login page
		return res.redirect('/');
	}
	
	next();
};

// checks if the user is logged out
var requiresLogout = function(req, res, next) {
	if(req.session.account) {
		// reroutes to player profile
		return res.redirect('/profile');
	}
	
	next();
};

// checks for HTTPS connection
var requiresSecure = function(req, res, next) {
	if(req.headers['x-forwarded-proto'] != 'https') {
		// reloads page with HTTPS
		return res.redirect('https://' + req.hostname + req.url);
	}
	
	next();
};

// bypasses HTTPS when running a local version
var bypassSecure = function(req, res, next){
	next();
};

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

// exports appropriate security check based on version used
if(process.env.NODE_ENV === "production") {
	module.exports.requiresSecure = requiresSecure;
}
else {
	module.exports.requiresSecure = bypassSecure;
}