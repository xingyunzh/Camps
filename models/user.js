var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
	name:String,

	nickname:{
		type:String
	},

	uid:String,

	roles:[String],

	skills:[String],

	sector:String
});

var User = mongoose.model("User", userSchema);

module.exports = User;