var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = Schema({
	name:{
		type:String,
		index:true,
		required:true
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

	member:[{
		type:Schema.Types.ObjectId,
		ref:'User'
	}],

	lead:{
		type:Schema.Types.ObjectId,
		ref:'User'
	},

	state:Number
});

var Team = mongoose.model("Team", teamSchema);

module.exports = Team;