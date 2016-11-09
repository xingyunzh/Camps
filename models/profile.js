var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = Schema({

});

var Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;