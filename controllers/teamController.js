var teamRepository = require('./repositories/teamRepository');

exports.createTeam = function(req,res){
	var team = req.body.team;

	teamRepository.create(team,function(err,result){
		if (err) {
			console.log(err);
			res.send(util.wrapBody('Internal Err','E'));
		} else {
			res.send(util.wrapBody({success:true}));
		}
	});
}

exports.updateTeam = function(req,res){
	//to do
}