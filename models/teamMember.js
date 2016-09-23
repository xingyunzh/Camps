var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roles = 'lead member'.split(' ');
var states = 'working study'.split(' ');

var teamMemberSchema = Schema({
	team:{
		type:Schema.Type.ObjectId,
		ref:'Team'
	},

	user:{
		type:Schema.Type.ObjectId,
		ref:'User'
	},

	isLeader:Boolean,

});

var TeamMember = mongoose.model("TeamMember", temMemberSchema);

module.exports = TeamMember;