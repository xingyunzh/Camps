var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ideaSchema = Schema({
	name:{
		type:String
	},

	alphabetName:[{
		type:String,
		index:true
	}],

	headImgUrl:String,

	state:String,

	background:String,

	innovator:{
		type:Schema.Types.ObjectId,
		ref:'User',
		required:true,
		index:true
	},

	consultant:{
		type:Schema.Types.ObjectId,
		ref:'User'
	},

	createDate:{
		type:Date,
		default:new Date()
	},

	editDate:{
		type:Date,
		default:new Date()
	},

	sector:String,

	deadline:Date,

	painpoint:String,

	solution:String,

	hrRequirement:String,

	relatedAssets:[{
		type:Schema.Types.ObjectId,
		ref:'Asset'
	}],

	images:[String]
	
});

var Idea = mongoose.model('Idea', ideaSchema);


module.exports = Idea;