var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var badgeSchema = Schema({
	name:String,
	
	content:String
});

var Badge = mongoose.model("Badge", badgeSchema);

module.exports = Badge; 