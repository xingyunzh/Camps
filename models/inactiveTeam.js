var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inactiveTeamSchema = Schema({
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
	},

	project:{
		type:Schema.Types.ObjectId,
		ref:'Project'
	},

	inactiveDate:Date
});

var InactiveTeam = mongoose.model("InactiveTeam", inactiveTeamSchema);

module.exports = InactiveTeam;