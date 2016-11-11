var userController = require('../controllers/userController.js');

var router = require('express').Router();

router.get('/profile/:id',userController.getProfileById);

router.post('/profile/update',userController.update);

router.post('/list',userController.listUser);

module.exports = router;