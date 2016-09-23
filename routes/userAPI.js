var userController = require('../controllers/userController.js');

var router = require('express').router();

router.post('/profile',userController.getProfile);

module.exports = router;