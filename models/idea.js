var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ideaSchema = Schema({
	name:String,

	content:String,

	creator:{
		type:Schema.Type.ObjectId,
		ref:'Player'
	}

	deadline:Date
});

var Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;