var userStoryController = require('../controllers/userStoryController');
var authenticator = require('../authenticate/authenticator');
var router = require('express').Router();

//query parameters
//	required:
//		id:String (project)
//body parameters
//	required:
//		as:String
//		want:String
//		soThat:String
//	optional:
//		point:String  此API目前可被update代替，暂时保留，往后可能删除
router.post('/add/:id',authenticator.authenticate,userStoryController.createForProject);

//query parameters
//	required:
//		id:String (project)
router.get('/project/:id',userStoryController.getUSByProject);

//query parameters
//	required:
//		id:String (userStory)
router.get('/:id',userStoryController.getUserStoryById);

//query parameters
//	required:
//		id:String (project)
//body parameters
//	required:
//		as:String
//		want:String
//		soThat:String
//	optional:
//		point:String
router.post('/update/:id',authenticator.authenticate,userStoryController.updateForProject);

module.exports = router;