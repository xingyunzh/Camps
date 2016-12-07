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

//path parameters
//	required:
//		id:String (project)
//response:
//{project:entity} (project)
router.get('/id/:id',projectController.getProjectById);

//query parameters
//	required:
//	optional:
//		pageNum:Number (default:0)
//		pageSize:Number (default:10)
//		keyword:String (for name)
//response:
//{
//	total:TotalNumber,
//	projects:[entity] (project)
//}
router.get('/list',projectController.list);

//path parameters
//	required:
//		id:String (project)
//body parameters
//	required:
//	optional:
// 		manager:id(user)
//		headImgUrl:String
//		team:id(team)
//		name:String (not '')
//		scope:String
// 		relatedIdea:id (idea)
//		relatedAsset:[id] (asset) 未实现
//response:
//{project:entity (project)}
router.post('/update/:id',authenticator.authenticate,projectController.update);

module.exports = router;