var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scoresSchema = Schema({
	//To Do
});

var Scores = mongoose.model("Scores", scoresSchema);

module.exports = Scores;