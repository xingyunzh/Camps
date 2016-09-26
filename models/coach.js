var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var coachSchema = Schema({

	user:{
		type:Schema.Types.ObjectId,
		ref:'User'
	},

	ideas:[{
		type:Schema.Types.ObjectId,
		ref:'Idea'
	}],

	team:[{
		type:Schema.Types.ObjectId,
		ref:'Team'
	}],

	assets:[{
		type:Schema.Types.ObjectId,
		ref:'Asset'
	}]
});

var Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach;