var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var coachSchema = Schema({

	user:{
		type:Schema.Type.ObjectId,
		ref:'User'
	},

	ideas:[{
		type:Schema.Type.ObjectId,
		ref:'Idea'
	}],

	team:[{
		type:Schema.Type.ObjectId,
		ref:'Team'
	}],

	assets:[{
		type:Schema.Type.ObjectId,
		ref:'Asset'
	}]
});

var Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach;