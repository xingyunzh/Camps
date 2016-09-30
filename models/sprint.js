var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sprintSchema = Schema({
	startDate:Date,

	endDate:Date,

	userStoris:[{
		type:Schema.Types.ObjectId,
		ref:'UserStory'
	}],

	task:[{
		type:Schema.Types.ObjectId,
		ref:'Task'
	}],

	discussMinutes:[{
		type:Schema.Types.ObjectId,
		ref:'discussMinutes'
	}]

	deliverables:{
		snapShot:[{
			url:String,
			user:{
				type:Schema.Types.ObjectId,
				ref:'User'
			},
			date:Date
		}],

		evaluate:String,

		demo:{
			url:String,
			user:{
				type:Schema.Types.ObjectId,
				ref:'User'
			},
			date:Date
		},

		git:{
			url:String,
			user:{
				type:Schema.Types.ObjectId,
				ref:'User'
			},
			date:Date
		}
	}
});

var Sprint = mongoose.model("Sprint", sprintSchema);

module.exports = Sprint;