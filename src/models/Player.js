var mongoose = require('mongoose');
var _ = require('underscore');

var PlayerModel;

var setName = function(name) {
	return _.escape(name).trim();
};

var PlayerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		set: setName
	},
	
	plays: {
		type: Number,
		required: true,
		default: 0
	},
	
	wins: {
		type: Number,
		required: true,
		default: 0
	},
	
	losses: {
		type: Number,
		required: true,
		default: 0
	},
	
	owner: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
	
	createdData: {
		type: Date,
		default: Date.now
	}
});

PlayerSchema.methods.toAPI = function() {
	return {
		name: this.name,
		age: this.age,
		job: this.job
	};
};

PlayerSchema.statics.findByOwner = function(ownerId, callback) {
	var search = {
		owner: mongoose.Types.ObjectId(ownerId)
	};
	
	return PlayerModel.findOne(search).select("name plays wins losses").exec(callback);
};

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