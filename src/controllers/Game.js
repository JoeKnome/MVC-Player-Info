var _ = require('underscore');
var models = require('../models');

var Player = models.Player;

// render game page
var gamePage = function(req, res) {
	res.render('game', {csrfToken: req.csrfToken()});
};

// render profile with player information
var profilePage = function(req, res) {
	Player.PlayerModel.findByOwner(req.session.account._id, function(err, doc) {
		if(err) {
			console.log(err);
			return res.status(400).json({error: "An error occurred"});
		}
		res.render('profile', {csrfToken: req.csrfToken(), player: doc});
	});
};

// render about page
var aboutPage = function(req, res) {
	res.render('about');
};

// updates player stats after a game is completed
var updateStats = function(req, res) {
	// find appropriate player
	Player.PlayerModel.findByOwner(req.session.account._id, function(err, doc) {
		// errors if something goes wrong or no player is found
		if(err) {
			console.log(err);
			return res.status(400).json({error: "An error occurred"});
		}
		
		if(!doc) {
            return res.json({error: "Player data not found"});
        }
		
		// increment number of games played
		doc.plays++;
		
		// increment number of wins or losses
		if(req.body.result == "win")
			doc.wins++;
		
		else
			doc.losses++;
		
		// save the update
		doc.save(function(err) {
			if (err) {
				console.log(err);
				return res.status(400).json({error:"An error occurred"});
			}
			
			// give all clear
			return res.status(200);
		});
	});
};

module.exports.gamePage = gamePage;
module.exports.profilePage = profilePage;
module.exports.aboutPage = aboutPage;
module.exports.updateStats = updateStats;
