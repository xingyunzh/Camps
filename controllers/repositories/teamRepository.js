var Team = require('../models/team');

exports.create = function(team,callback){

	Team.create(team,callback);
}