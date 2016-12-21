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
//		id:String (sprint)
//body parameters
// required:
//	optional:
//		startDate:Date
//		endDate:Date 
//		backlog:[id] (userStory)
//response:
//{sprint:[SprintEntity]}
router.post('/update/:id',sprintController.update);

//query parameters
//	required:
//		id:String (project)
//body parameters
//required
//	startDate:Date
//	endDate:Date
//response:
//{sprint:[SprintEntity]}
router.post('/add/:id',sprintController.create);

//query parameters
//	required:
//		id:String (sprint)
//response:
// {sprint:[SprintEntity]}
router.get('/id/:id',sprintController.getSprintById);


module.exports = router;


