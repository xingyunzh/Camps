var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var discussMinutesSchema = Schema({
	creator:{
		type:Schema.types.ObjectId,
		ref:'user'
	},

	communicationMethod:String,

	participant:[{
		type:Schema.types.ObjectId,
		ref:'user'
	}],

	result:String,

	createDate:Date,

	lastEditDate:Date
});

var DiscussMinutes = mongoose.model("DiscussMinutes", discussMinutesSchema);

module.exports = DiscussMinutes;