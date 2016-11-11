var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ideaSchema = Schema({
	name:{
		type:String
	},

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

	painPoint:String,

	solution:String,

	hrRequirement:String,

	relatedAssets:[{
		type:Schema.Types.ObjectId,
		ref:'Asset'
	}]
});

var Idea = mongoose.model('Idea', ideaSchema);

ideaSchema.method('isCompleted',function() {
	return this.name &&
		this.background &&
		this.solution &&
		this.innovator &&
		this.sector &&
		this.painPoint &&
		this.hrRequirement;
});

module.exports = Idea;