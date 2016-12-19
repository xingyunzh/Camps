var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = Schema({
	name:{
		type:String,
		index:true,
		required:true,
		unique:true
	},

	headImgUrl:String,

	description:String,

	teamId:{
		type:String,
		required:true,
		index:true
	},

	project:{
		type:Schema.Types.ObjectId,
		ref:'Project'
	},

	createDate:Date,

	coach:{
		type:Schema.Types.ObjectId,
		ref:'User'
	},

	//first member is the team lead
	members:[{
		type:Schema.Types.ObjectId,
		ref:'User'
	}],

	state:Number
});

var Team = mongoose.model("Team", teamSchema);

module.exports = Team;