var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assetSchema = Schema({
	name:String,

	content:String,

	createDate:Date,

	lastEditDate:Date
});

var Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;