var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var giftSchema = Schema({
	from:{
		type:Schema.types.ObjectId,
		ref:'user'
	},

	to:{
		type:Schema.types.ObjectId,
		ref:'user'
	},

	content:String,

	sendDate:Date
});

var Gift = mongoose.model("Gift", giftSchema);

module.exports = Gift;