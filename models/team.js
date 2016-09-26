var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = Schema({
	name:String,

	description:String,

	teamId:String,

	isActive:Boolean,

	project:{
		type:Schema.Types.ObjectId,
		ref:'Project'
	},

	createdDate:Date,

	deactiveDate:Date,

	activeDate:Date
});

var Team = mongoose.model("Team", teamSchema);

module.exports = Team;