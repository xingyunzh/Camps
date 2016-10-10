var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assetSchema = Schema({
	name:{
		tpye:String,
		index:true,
		required:true
	},

	assetId:{
		type:String,
		index:true,
		required:true
	},

	category:{
		type:String,
		index:true,
		required:true
	},

	version:{
		type:String,
		required:true
	},

	editDate:{
		type:Date,
		required:true
	},

	guide:String,

	demo:String,

	maintainer:{
		type:Schema.Types.ObjectId,
		ref:'User',
		index:true,
		required:true
	}
});

var Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;