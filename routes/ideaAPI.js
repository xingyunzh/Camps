var ideaController = require('../controllers/ideaController.js');

var router = require('express').Router();


//body parameters
//	required:
//	optional:
//		name:String
//		background:String
//		solution:String
//		painPoint:String
//		innovator:String (User)
//		consultant:String (User)
//		sector:String
//		deadline:Date
//		hrRequirement:String
//		relatedAssets:[String] (Asset)
router.post('/add',ideaController.createIdea);

//query parameters
//	required:
//		id:String (idea)
router.get('/:id',ideaController.getIdeaById);

//query parameters
//	required:
//		id:String (idea)
//body parameters
//	required:
//	optional:
//		name:String
//		background:String
//		solution:String
//		painPoint:String
//		innovator:String (User)
//		consultant:String (User)
//		sector:String
//		deadline:Date
//		hrRequirement:String
//		relatedAssets:[String] (Asset)
router.post('/update/:id',ideaController.updateIdea);

//query parameters
//	required:
//		id:String (idea)/Use string 'new' instead if createAndPublish
//body parameters
//	required:
//	optional:
//		name:String
//		background:String
//		solution:String
//		painPoint:String
//		innovator:String (User)
//		consultant:String (User)
//		sector:String
//		deadline:Date
//		hrRequirement:String
//		relatedAssets:[String] (Asset)
router.post('/publish/:id',ideaController.publishIdea);

//query parameters
//	required:
//		id:String (idea)
router.get('/delete/:id',ideaController.deleteIdea);

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
router.post('/list',ideaController.listIdea);


//body parameters
//	required:
//	optional:
//		pageNum:Number
//		pageSize:Number
//		keyword:String (for name)
//		sector:String
router.post('/list/innovator',ideaController.listIdeasByInnovator);

module.exports = router;