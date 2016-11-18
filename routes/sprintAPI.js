var sprintController = require('../controllers/sprintController');
var authenticator = require('../authenticate/authenticator');
var router = require('express').Router();

//query parameters
//	required:
//		id:String (project)
//response:
// {sprints:[SprintEntities]}
router.get('/project/:id',sprintController.getSprintsByProject);

//query parameters
//	required:
//		id:String (project)
//body parameters
// required:
//{	
//	tasks:[
//	 {"description":"do something","effort":"2days","assignee":String(user Id),
//		"userStory":String(userStory id),"duedate":Date}  //add
// 	 {"_id":"xxxxx"}  //remove
//	 {"_id":"xxxxx","description":"do something","effort":"2days","assignee":String(user Id),
//		"userStory":String(userStory id),"duedate":Date} //update
//   	required parameters are to be decided
// ]}
//optional:
//startDate:Date
//	endDate:Date 
//	backlog:[String] (userStory id)
//response:
//{sprint:[SprintEntity]}
router.post('/update/:id',sprintController.update);

//query parameters
//	required:
//		id:String (project)
//body parameters
//required
//{	startDate:Date
//	endDate:Date
//	backlog:[String] (userStory id)
//	tasks:[
//	 {"description":"do something","effort":"2days","assignee":String(user Id),
//		"userStory":String(userStory id),"duedate":Date}  //add
// 	 {"_id":"xxxxx"}  //remove
//	 {"_id":"xxxxx","description":"do something","effort":"2days","assignee":String(user Id),
//		"userStory":String(userStory id),"duedate":Date} //update
//   	required parameters are to be decided
// ]}
//response:
//{sprint:[SprintEntity]}
router.post('/add',sprintController.create);

//query parameters
//	required:
//		id:String (sprint)
//response:
// {sprint:[SprintEntity]}
router.get('/id/:id',sprintController.getSprintById);