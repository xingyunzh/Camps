var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assetSchema = Schema({
	name:String,

	category:String,

	version:String,

	editDate:Date,

	guide:String,

	demo:String,

	maintainer:{
		type:Schema.Types.ObjectId,
		ref:'User'
	}
});

var Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;