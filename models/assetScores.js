var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assetScoresSchema = Schema({
	usability:Number,

	hardship:Number,

	size:Number,

	quality:Number,

	maintenance:Number
});

var AssetScores = mongoose.model("AssetScores", AssetScoresSchema);

module.exports = AssetScores;