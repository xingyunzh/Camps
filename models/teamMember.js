var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roles = 'lead member'.split(' ');
var states = 'working study'.split(' ');

var teamMemberSchema = Schema({
	team:{
		type:Schema.Types.ObjectId,
		ref:'Team'
	},

	user:{
		type:Schema.Types.ObjectId,
		ref:'User'
	},

	isLeader:Boolean,

});

var TeamMember = mongoose.model("TeamMember", temMemberSchema);

module.exports = TeamMember;