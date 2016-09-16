var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
	name:String,

	uid:String
});

var User = mongoose.model("User", userSchema);

module.exports = User;