var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamMemberSchema = Schema({
	team:{
		type:Schema.Type.ObjectId,
		ref:'Team'
	},

	player:{
		type:Schema.Type.ObjectId,
		ref:'Player'
	},

	role:String,

	joinDate:Date
});

var TeamMember = mongoose.model("TeamMember", userSchema);

module.exports = TeamMember;