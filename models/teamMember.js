var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roles = 'lead member'.split(' ');
var states = 'working study'.split(' ');

var teamMemberSchema = Schema({
	team:{
		type:Schema.Type.ObjectId,
		ref:'Team'
	},

	player:{
		type:Schema.Type.ObjectId,
		ref:'Player'
	},

	state:{
		type:String,
		enum:states
	}

	role:{
		type:String,
		enum:roles
	},

	joinDate:Date
});

var TeamMember = mongoose.model("TeamMember", temMemberSchema);

module.exports = TeamMember;