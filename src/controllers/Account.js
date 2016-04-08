var models = require('../models');

var Account = models.Account;
var Player = models.Player;

// render login page
var loginPage = function(req, res) {
	res.render('login', {csrfToken: req.csrfToken()});
};

// render signup page
var signupPage = function(req, res) {
	res.render('signup', {csrfToken: req.csrfToken()});
};

// destroy session info and redirect to login
var logout = function(req, res) {
	req.session.destroy();
	res.redirect('/');
};

// handle user login attempt
var login = function(req, res) {
	// verify all fields filled
	if(!req.body.username || !req.body.pass) {
		return res.status(400).json({error: "All fields are required"});
	}
	
	// authenticate with account info
	Account.AccountModel.authenticate(req.body.username, req.body.pass, function(err, account) {
		// error for bad login info
		if(err || !account) {
			return res.status(401).json({error: "Wrong username or password"});
		}
		
		// create session on success
		req.session.account = account.toAPI();
		
		// redirect to profile
		res.json({redirect: '/profile'});
	});
};

// handle new user signup
var signup = function(req, res) {
	// verify all fields filled
	if(!req.body.username || !req.body.pass ||!req.body.pass2) {
		return res.status(400).json({error: "All fields are required"});
	}
	
	// check for matching passwords
	if(req.body.pass !== req.body.pass2) {
		return res.status(400).json({error: "Passwords do not match"});
	}
	
	// generate new account with security
	Account.AccountModel.generateHash(req.body.pass, function(salt, hash) {
		// data for new account
		var accountData = {
			username: req.body.username,
			salt: salt,
			password: hash
		};
		
		// create account
		var newAccount = new Account.AccountModel(accountData);
		
		// save account to DB
		newAccount.save(function(err) {
			if(err) {
				console.log(err);
				return res.status(400).json({error:"An error occurred"});
			}
			
			// create new session on success
			req.session.account = newAccount.toAPI();
			
			// generate new player data for this account
			generatePlayer(req, res);
		});
	});
};

// create new player data for new user
var generatePlayer = function(req, res) {
	// data from new user for new player
	var playerData = {
		name: req.body.username,
		owner: req.session.account._id
	};
	
	// create player
	var newPlayer = new Player.PlayerModel(playerData);
	
	// save player to DB
	newPlayer.save(function(err) {
		if(err) {
			console.log(err);
			return res.status(400).json({error:"An error occurred"});
		}
		
		// redirect to profile
		res.json({redirect: '/profile'});
	});
};

// handle editing of player info
var editPlayer = function(req, res) {
	// find player to be edited
	Player.PlayerModel.findByOwner(req.session.account._id, function(err, doc) {
		// errors for problem or no player data
		if(err) {
            return res.json({err:err});          
        }
		
		if(!doc) {
            return res.json({error: "Player data not found"});
        }

		// set player name to new name
		doc.name = req.body.name;
		
		// save updated name
		doc.save(function(err) {
			if (err) {
				console.log(err);
				return res.status(400).json({error:"An error occurred"});
			}
			
			// reload profile
			res.json({redirect: '/profile'});
		});
	});
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signupPage = signupPage;
module.exports.signup = signup;
module.exports.editPlayer = editPlayer;