var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = Schema({
	user:{
		type:Schema.type.ObjectId,
		ref:'user'
	},

	content:String,

	createDate:Date,

	lastEditDate:Date
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;