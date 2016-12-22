var sprintController = require('../controllers/sprintController');
var authenticator = require('../authenticate/authenticator');
var router = require('express').Router();

//path parameters
//	required:
//		id:id (project)
//response:
// {sprints:[SprintEntities]}
router.get('/project/:id',sprintController.getSprintsByProject);

//path parameters
//	required:
//		id:id (sprint)
//body parameters
// required:
//	optional:
//		startDate:Date
//		endDate:Date 
//		backlog:[id] (userStory)
//response:
//{sprint:[SprintEntity]}
router.post('/update/:id',sprintController.update);

//path parameters
//	required:
//		id:id (project)
//body parameters
//required
//	startDate:Date
//	endDate:Date
//response:
//{sprint:[SprintEntity]}
router.post('/add/:id',sprintController.create);

//path parameters
//	required:
//		id:id (sprint)
//response:
// {sprint:[SprintEntity]}
router.get('/id/:id',sprintController.getSprintById);

//path parameters
//	required:
//		id:id (sprint)
//response:
// {sprint:[SprintEntity]}
router.get('/remove/:id',sprintController.remove);


module.exports = router;


