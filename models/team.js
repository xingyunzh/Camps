var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = Schema({
	name:String,

	createdDate:Date
});

var Team = mongoose.model("Team", teamSchema);

module.exports = Team;