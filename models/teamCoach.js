var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamCoachSchema = Schema({
	team:{
		type:Schema.Types.ObjectId,
		ref:'Team'
	},

	coach:{
		type:Schema.Types.ObjectId,
		ref:'Coach'
	},

	startDate:Date,

	endDate:Date
});

var TeamCoach = mongoose.model("TeamCoach", teamCoachSchema);

module.exports = TeamCoach;