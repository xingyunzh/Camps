var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var coachSchema = Schema({

	user:{
		type:Schema.Types.ObjectId,
		ref:'User',
		required:true
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
	}],

	sector:String
});

var Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach;