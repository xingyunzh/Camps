var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var coachSchema = Schema({
	name:String,

	user:{
		type:Schema.Type.ObjectId,
		ref:'User'
	}
});

var Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach;