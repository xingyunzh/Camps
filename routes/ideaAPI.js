var ideaController = require('../controllers/ideaController');
var authenticator = require('../authenticate/authenticator');
var router = require('express').Router();


//body parameters
//	required:
// 		name:String
//	optional:
//		background:String
//		solution:String
//		painpoint:String
//		innovator:String (User)
//		consultant:String (User)
//		sector:String
//		deadline:Date
//		hrRequirement:String
//		relatedAssets:[String] (Asset)
//response:
//{idea:IdeaEntity}
router.post('/add',authenticator.authenticate,ideaController.createIdea);

//query parameters
//	required:
//		id:String (idea)
//response:
//{idea:IdeaEntity}
router.get('/id/:id',ideaController.getIdeaById);

//query parameters
//	required:
//		id:String (idea)
//body parameters
//	required:
//	optional:
//		name:String
//		background:String
//		solution:String
//		painpoint:String
//		innovator:String (User)
//		consultant:String (User)
//		sector:String
//		deadline:Date
//		hrRequirement:String
//		relatedAssets:[String] (Asset)
//response:
//{idea:IdeaEntity}
router.post('/update/:id',authenticator.authenticate,ideaController.updateIdea);

//query parameters
//	required:
//		id:String (idea)/Use string 'new' instead if createAndPublish
//body parameters
//	required:
//	optional:
//		name:String
//		background:String
//		solution:String
//		painpoint:String
//		innovator:String (User)
//		consultant:String (User)
//		sector:String
//		deadline:Date
//		hrRequirement:String
//		relatedAssets:[String] (Asset)
//response:
//{idea:IdeaEntity}
router.post('/publish/:id',authenticator.authenticate,ideaController.publishIdea);

//query parameters
//	required:
//		id:String (idea)
//	**********INCOMPLETE!*********
//router.get('/delete/:id',authenticator.authenticate,ideaController.deleteIdea);

//body parameters
//	required:
//		name:String
//	optional:
//router.post('/check/name',ideaController.checkIfNameExists);

//body parameters
//	required:
//	optional:
//		pageNum:Number
//		pageSize:Number
//		keyword:String (for name)
//		sector:String
//response:
//{total:TotalNumber,ideas:[IdeaEntities]}
router.post('/list',ideaController.listIdea);


//body parameters
//	required:
// 		id:String (innovator)
//	optional:
//		pageNum:Number
//		pageSize:Number
//		keyword:String (for name)
//		sector:String
//response:
//{total:TotalNumber,ideas:[IdeaEntities]}
router.post('/list/:id',ideaController.listIdeasByInnovator);

module.exports = router;