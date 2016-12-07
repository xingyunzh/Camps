var projectController = require('../controllers/projectController');
var authenticator = require('../authenticate/authenticator');
var router = require('express').Router();


//body parameters
//	required:
//		name:String
//	optional:
//		headImgUrl:String
//		team:id(team)
//		scope:String
// 		relatedIdea:id (idea)
//		relatedAsset:[id] (asset) 未实现
//response:
//{project:{
//		name:String
//		scope:String
//		headImgUrl:String
//		createDate:Date
//		manager:id (user)
//		relatedIdea:id (idea)
//		relatedAsset: []
//	 	team:id (team)
//		backlog:[id] (userStory)
//		sprints:[id] (sprint)
//}}
router.post('/add',authenticator.authenticate,projectController.create);

//query parameters
//	required:
//		id:String (project)
//response:
//{project:{
//		name:String
//		scope:String
//		headImgUrl:String
//		createDate:Date
//		manager:String (user)
//		relatedIdea:String (idea)
//		relatedAsset: []
//	 	team:String (team)
//		backlog:[String] (userStory)
//		sprints:[String] (sprint)
//}}
router.get('/id/:id',projectController.getProjectById);

//query parameters
//	required:
//	optional:
//		pageNum:Number (default:0)
//		pageSize:Number (default:10)
//		keyword:String (for name)
//response:
//{total:TotalNumber,projects:[ProjectEntities]}
router.get('/list',projectController.list);

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
//response:
//{project:{ProjectEntity}}
router.post('/update/:id',authenticator.authenticate,projectController.update);

module.exports = router;