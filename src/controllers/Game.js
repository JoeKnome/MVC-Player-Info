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

var aboutPage = function(req, res) {
	res.render('about');
};

module.exports.gamePage = gamePage;
module.exports.profilePage = profilePage;
module.exports.aboutPage = aboutPage;
