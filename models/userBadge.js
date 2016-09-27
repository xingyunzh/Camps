var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userBadgeSchema = Schema({
	user:{
		type:Schema.Types.ObjectId,
		ref:'User'
	}

	badge:{
		type:Schema.Types.ObjectId,
		ref:'Badge'
	},

	obtainDate:Date
});

var TeamCoach = mongoose.model("TeamCoach", teamCoachSchema);

module.exports = TeamCoach;