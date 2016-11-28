var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = Schema({
	name:String,

	url:String,

	type:Number
});

var Item = mongoose.model("Item", itemSchema);

module.exports = Item; 