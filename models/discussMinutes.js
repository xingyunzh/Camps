var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var discussMinutesSchema = Schema({
	creator:{
		type:Schema.Types.ObjectId,
		ref:'User'
	},

	communicationMethod:String,

	participant:[{
		type:Schema.Types.ObjectId,
		ref:'User'
	}],

	result:String,

	createDate:Date,

	lastEditDate:Date
});

var DiscussMinutes = mongoose.model("DiscussMinutes", discussMinutesSchema);

module.exports = DiscussMinutes;