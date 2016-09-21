var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
	name:String,

	uid:String,

	birthday:Date
});

var User = mongoose.model("User", userSchema);

module.exports = User;