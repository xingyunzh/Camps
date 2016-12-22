var teamController = require('../controllers/teamController');
var authenticator = require('../authenticate/authenticator');
var router = require('express').Router();


//body parameters
//	required:
//		name:String
//	optional:
//		description:String
//		coach:id (user)
//		lead:id(user)
//		members:[id] (user)
//		project:id (project)
//response:
// {team:{TeamEntity}}
router.post('/add',authenticator.authenticate,teamController.create);

//query parameters
//	required:
//		id:String (idea)
//response:
// {team:{TeamEntity}}
router.get('/id/:id',teamController.getTeamById);

//query parameters
//	required:
//		id:[id] (member)
//response:
// {team:{TeamEntity}}
router.get('/member/:id',teamController.getTeamByMember);

//query  parameters
//	required:
//	optional:
//		pageNum:Number (default:0)
//		pageSize:Number (default:10)
//		keyword:String (for name)
//response:
// {total:totalNumber,teams:[TeamEntities]}
router.get('/list',teamController.list);


//query parameters
//	required:
//		name:String 
//response:
//{exist:true/false}
router.get('/check',teamController.checkExist);

//body parameters
//	required:
//	optional:
//		name:String
//		description:String
//		coach:id (user)
//		lead:id(user)
//		member:[id] (user)
//		project: id (project)
//response:
//{team:TeamEntity}
router.post('/update/:id',authenticator.authenticate,teamController.update);

//body parameters
//	required:
//		id:id(team)
//response:
//{success:true}
router.delete('/remove/:id',authenticator.authenticate,teamController.removeById);


module.exports = router;