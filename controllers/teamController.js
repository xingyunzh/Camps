var Team = require('../models/team');

exports.createTeam = function(req,res){
	var team = req.body.team;

	Team.create(team,function(err,result){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Internal Err','E'));
		} else {
			res.send(util.wrapBody({success:true}));
		}
	});
}

exports.updateTeam = function(req,res){
	
}