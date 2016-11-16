var projectController = require('../controllers/projectController');
var authenticator = require('../authenticate/authenticator');
var router = require('express').Router();


//body parameters
//	required:
//		name:String
//	optional:
//		scope:String
// 		relatedIdea:String (idea)
//		relatedAsset:[String] (asset) 未实现
router.post('/add',authenticator.authenticate,projectController.create);

//query parameters
//	required:
//		id:String (project)
router.get('/:id',projectController.getProjectById);

//body parameters
//	required:
//	optional:
//		pageNum:Number (default:0)
//		pageSize:Number (default:10)
//		keyword:String (for name)
router.post('/list',projectController.list);

//query parameters
//	required:
//		id:String (project)
//body parameters
//	required:
//	optional:
//		name:String
//		scope:String
// 		relatedIdea:String (idea)
//		relatedAsset:[String] (asset) 未实现
router.post('/update/:id',authenticator.authenticate,projectController.update);

module.exports = router;