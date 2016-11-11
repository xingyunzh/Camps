var userController = require('../controllers/userController');
var authenticator = require('../authenticate/authenticator');
var router = require('express').Router();

router.post('/login/wechat',userController.loginByWechat);

router.post('/login/email',userController.loginByEmail);

router.get('/profile/:id',userController.getProfileById);

router.post('/profile/update',authenticator.authenticate,userController.update);

router.post('/list',userController.listUser);

module.exports = router;