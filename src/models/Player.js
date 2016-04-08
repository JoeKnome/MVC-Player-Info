var mongoose = require('mongoose');
var _ = require('underscore');

var PlayerModel;

var setName = function(name) {
	return _.escape(name).trim();
};

var PlayerSchema = new mongoose.Schema({
	// screen name that others see
	name: {
		type: String,
		required: true,
		trim: true,
		set: setName
	},
	
	// number of total game plays
	plays: {
		type: Number,
		required: true,
		default: 0
	},
	
	// number of games won
	wins: {
		type: Number,
		required: true,
		default: 0
	},
	
	// number of games lost
	losses: {
		type: Number,
		required: true,
		default: 0
	},
	
	// user who owns this player
	owner: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
	
	// time of creation
	createdData: {
		type: Date,
		default: Date.now
	}
});

// find player info by owner
PlayerSchema.statics.findByOwner = function(ownerId, callback) {
	var search = {
		owner: mongoose.Types.ObjectId(ownerId)
	};
	
	return PlayerModel.findOne(search).select("name plays wins losses").exec(callback);
};

// find player info by screen name
PlayerSchema.statics.findByName = function(ownerId, name, callback) {
    var search = {
		owner: mongoose.Types.ObjectId(ownerId),
        name: name
    };

    return PlayerModel.findOne(search).select("name plays wins losses").exec(callback);
};

PlayerModel = mongoose.model('Player', PlayerSchema);

module.exports.PlayerModel = PlayerModel;
module.exports.PlayerSchema = PlayerSchema;