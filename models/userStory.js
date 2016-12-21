var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userStorySchema = Schema({
	as:{
		type:String,
		required:true
	},

	want:{
		type:String,
		required:true
	},

	soThat:{
		type:String,
		required:true
	},

	point:String,

	tasks:[{
		type:Schema.Types.ObjectId,
		ref:'Task'
	}]
});

var UserStory = mongoose.model("UserStory", userStorySchema);

module.exports = UserStory;