var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activeTeamSchema = Schema({
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

	activeDate:Date
});

var ActiveTeam = mongoose.model("ActiveTeam", activeTeamSchema);

module.exports = ActiveTeam;