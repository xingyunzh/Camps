var userController = require("../controllers/userController");

var router = require('express').router();


router.post('/register',userController.createUser);

router.post('/login/wechat',userController.loginByWechat);

router.post('/login/email',userController.loginByEmail);


module.exports = router;