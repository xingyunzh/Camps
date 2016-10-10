var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var badgeSchema = Schema({
	name:{
		type:String,
		index:true,
		required:true
	},
	
	content:String
});

var Badge = mongoose.model("Badge", badgeSchema);

module.exports = Badge; 