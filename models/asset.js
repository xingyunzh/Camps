var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assetSchema = Schema({
	name:{
		type:String,
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
		type:Number
	},

	editDate:{
		type:Date,
		default:new Date()
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