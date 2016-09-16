var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = Schema({
	userId:{
		type:Schema.type.objectId,
		ref:'User'
	}

	points:Number,

	level:Number
});

var Player = mongoose.model("Player", playerSchema);

module.exports = Player;