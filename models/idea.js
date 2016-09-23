var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ideaSchema = Schema({
	name:String,

	background:String,

	innovator:{
		type:Schema.Type.ObjectId,
		ref:'Player'
	},

	deadline:Date,

	painpoint:String,

	solution:String,

	hrRequirement:String,

	relatedAssets:[{
		type:Schema.Type.ObjectId,
		ref:'Asset'
	}]
});

var Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;