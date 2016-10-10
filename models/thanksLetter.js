var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var thanksLetterSchema = Schema({
	from:{
		type:Schema.types.ObjectId,
		ref:'User'
	},

	to:{
		type:Schema.types.ObjectId,
		ref:'User'
	},

	content:String,

	sendDate:Date
});

var ThanksLetter = mongoose.model("ThanksLetter", thanksLetterSchema);

module.exports = ThanksLetter;