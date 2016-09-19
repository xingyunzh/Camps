var userController = require('../controllers/userController.js');

module.exports = function(app){
	router.post('/profile',userController.getFullProfile);
};