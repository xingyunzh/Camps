var projectController = require('../controllers/projectController');
var authenticator = require('../authenticate/authenticator');
var router = require('express').Router();


//body parameters
//	required:
//		name:String
//	optional:
router.post('/add',authenticator.authenticate,projectController.create);

//query parameters
//	required:
//		id:String (idea)
router.get('/:id',projectController.getProjectById);

//body parameters
//	required:
//	optional:
//		pageNum:Number (default:1)
//		pageSize:Number (default:10)
//		keyword:String (for name)
router.post('/list',projectController.list);

//body parameters
//	required:
//	optional:
//		name:String
router.post('/update/:id',authenticator.authenticate,projectController.update);

module.exports = router;