var models = require('../models');

var Account = models.Account;
var Player = models.Player;

var loginPage = function(req, res) {
	res.render('login', {csrfToken: req.csrfToken()});
};

var signupPage = function(req, res) {
	res.render('signup', {csrfToken: req.csrfToken()});
};

var logout = function(req, res) {
	req.session.destroy();
	res.redirect('/');
};

var login = function(req, res) {
	if(!req.body.username || !req.body.pass) {
		return res.status(400).json({error: "All fields are required"});
	}
	
	Account.AccountModel.authenticate(req.body.username, req.body.pass, function(err, account) {
		if(err || !account) {
			return res.status(401).json({error: "Wrong username or password"});
		}
		
		req.session.account = account.toAPI();
		
		res.json({redirect: '/game'});
	});
};

var signup = function(req, res) {
	if(!req.body.username || !req.body.pass ||!req.body.pass2) {
		return res.status(400).json({error: "All fields are required"});
	}
	
	if(req.body.pass !== req.body.pass2) {
		return res.status(400).json({error: "Passwords do not match"});
	}
	
	Account.AccountModel.generateHash(req.body.pass, function(salt, hash) {
		var accountData = {
			username: req.body.username,
			salt: salt,
			password: hash
		};
		
		var newAccount = new Account.AccountModel(accountData);
		
		newAccount.save(function(err) {
			if(err) {
				console.log(err);
				return res.status(400).json({error:"An error occurred"});
			}
			
			req.session.account = newAccount.toAPI();
			
			generatePlayer(req, res);
		});
	});
};

var generatePlayer = function(req, res) {
	var playerData = {
		name: req.body.username,
		owner: req.session.account._id
	};
	
	var newPlayer = new Player.PlayerModel(playerData);
	
	newPlayer.save(function(err) {
		if(err) {
			console.log(err);
			return res.status(400).json({error:"An error occurred"});
		}
					
		res.json({redirect: '/profile'});
	});
};

var editPlayer = function(req, res) {
	Player.PlayerModel.findByOwner(req.session.account._id, function(err, doc) {
		if(err) {
            return res.json({err:err});          
        }
		
		if(!doc) {
            return res.json({error: "Player data not found"});
        }

		doc.name = req.body.name;
		
		doc.save(function(err) {
			if (err) {
				console.log(err);
				return res.status(400).json({error:"An error occurred"});
			}
			
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