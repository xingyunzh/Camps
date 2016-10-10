var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var humanScoresSchema = Schema({
	'plan&execution':Number,

	communication:Number,

	social:Number,

	quality:Number,

	visibility:Number
});

var HumanScores = mongoose.model("HumanScores", humanScoresSchema);

module.exports = HumanScores;