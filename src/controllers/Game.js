var _ = require('underscore');
var models = require('../models');

var Player = models.Player;

var gamePage = function(req, res) {
	res.render('game', {csrfToken: req.csrfToken()});
};

var profilePage = function(req, res) {
	Player.PlayerModel.findByOwner(req.session.account._id, function(err, doc) {
		if(err) {
			console.log(err);
			return res.status(400).json({error: "An error occurred"});
		}
		res.render('profile', {csrfToken: req.csrfToken(), player: doc});
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

module.exports.gamePage = gamePage;
module.exports.profilePage = profilePage;
module.exports.generatePlayer = generatePlayer;