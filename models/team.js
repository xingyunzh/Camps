var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = Schema({
	name:{
		type:String,
		index:true,
		required:true,
		unique:true
	},

	description:String,

	teamId:{
		type:String,
		required:true,
		index:true
	}

	isActive:Boolean,

	project:{
		type:Schema.Types.ObjectId,
		ref:'Project'
	},

	deactiveDate:Date,

	activeDate:Date
});

var Team = mongoose.model("Team", teamSchema);

module.exports = Team;