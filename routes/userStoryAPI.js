var userStoryController = require('../controllers/userStoryController');
var authenticator = require('../authenticate/authenticator');
var router = require('express').Router();

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
//userStories:[
//	 {"as":"user","want":"do","soThat":"something"}  //add
// 	 {"_id":"xxxxx"}  //remove
//	 {"_id":"xxxxx","as":"new user","want":"change","soThat":"something new"} //update
//   1 - 3 parameters of as,want,soThat are required for update
// ]
router.post('/update/:id',authenticator.authenticate,userStoryController.updateForProject);

module.exports = router;