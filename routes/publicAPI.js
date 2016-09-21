var userController = require("../controllers/userController");



module.exports = function(app){
	router.post('/register',userController.createUser);

	router.post('/login/wechat',userController.loginByWechat);

	router.post('/login/email',userController.loginByEmail);
};