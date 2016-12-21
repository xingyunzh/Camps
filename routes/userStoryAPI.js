var userStoryController = require('../controllers/userStoryController');
var authenticator = require('../authenticate/authenticator');
var router = require('express').Router();

//path parameters
//	required:
//		id:String (project)
//response:
// {backlog:[UserStoryEntities]}
router.get('/project/:id',userStoryController.getUSByProject);

//path parameters
//	required:
//		id:String (userStory)
//response:
// {userStory:{UserStoryEntity}
router.get('/id/:id',userStoryController.getUserStoryById);

//path parameters
//	required:
//		id:id (project)
//body parameters
//	required:
//		as:String
//		want:String
//		soThat:String
//response:
//{UserStory:UserStoryEntity}
router.post('/add/:id',authenticator.authenticate,userStoryController.create);

//path parameters
//	required:
//		id:id (userStory)
//response:
//{success:true}
router.delete('/remove/:id',authenticator.authenticate,userStoryController.remove);

//path parameters
//	required:
//		id:String (userStory)
//body parameters
//	optional:
//		as:String
//		want:String
//		soThat:String
//		tasks:[id] (task)
//response:
//{UserStory:UserStoryEntity}
router.post('/update/:id',authenticator.authenticate,userStoryController.update);

module.exports = router;