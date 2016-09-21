var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = Schema({
	name:String,
	content:String
});

var Item = mongoose.model("Item", itemSchema);

module.exports = Item; 