var TeamMember = require('../models/teamMember');

exports.getTeamByUserId = function(userId,callback) {
	TeamMember
	.findOne({
		user:userId
	}).select('team')
	.populate('team')
	.lean()
	.exec(callback);
}

exports.getMemberByTeam = function(team,callback){
	TeamMember
	.find({
		team:team
	}).populate('user')
	.lean()
	.exec(callback);
}