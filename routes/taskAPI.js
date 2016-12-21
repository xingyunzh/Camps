var taskController = require('../controllers/taskController');
var authenticator = require('../authenticate/authenticator');
var router = require('express').Router();

//path parameters
//	required:
//		id:id (UserStory)
//response:
// {tasks:[TaskEntities]}
router.get('/story/:id',taskController.getTasksByUserStory);

//path parameters
//	required:
//		id:String (task)
//body parameters
// required:
//	optional:
//		description:String
//		dueDate:Date 
//		effort:String
//		assignee:id(User)
//response:
//{task:[TaskEntity]}
router.post('/update/:id',taskController.update);

//path parameters
//	required:
//		id:String (project)
//body parameters
//	required
//		description:String
//	optional
//		dueDate:Date 
//		effort:String
//		assignee:id(User)	
//response:
//{task:[TaskEntity]}
router.post('/add/:id',taskController.create);

//path parameters
//	required:
//		id:String (task)
//response:
// {sprint:[SprintEntity]}
router.delete('/remove/:id',taskController.remove);


module.exports = router;


