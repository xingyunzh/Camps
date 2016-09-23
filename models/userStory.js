var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userStorySchema = Schema({
	as:String,

	do:String,

	then:String
});

var UserStory = mongoose.model("UserStory", userStorySchema);

module.exports = UserStory;