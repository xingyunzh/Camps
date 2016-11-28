var imageController = require('../controllers/imageController');
var router = require('express').Router();

//body parameters
//	required:
//		url:String
//		type:String (user,idea,team,project,)
//		name:String
//response:
//{image:ImageEntity}
router.post('/add',imageController.addNewImage);

router.get('/id/:id',imageController.getImageById);

router.get('/type/:type',imageController.getImagesByType);

module.exports = router;