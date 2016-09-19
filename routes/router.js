var userAPI = require('./userAPI.js');
var publicAPI = require('./publicAPI.js');

module.exports = function(app){

	router.use("/public", publicAPI);

	router.use('/api/user',userAPI);

};

