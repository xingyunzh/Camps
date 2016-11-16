var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userStorySchema = Schema({
	as:String,

	want:String,

	soThat:String,

	point:String
});

var UserStory = mongoose.model("UserStory", userStorySchema);

module.exports = UserStory;