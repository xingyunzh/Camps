var teamController = require('../controllers/teamController');
var authenticator = require('../authenticate/authenticator');
var router = require('express').Router();


//body parameters
//	required:
//		name:String
//	optional:
//		description:String
//		coach:id (user)
//		members:[id] (user)
//		project:id (project)
//response:
// {team:{TeamEntity}}
router.post('/add',authenticator.authenticate,teamController.create);

//path parameters
//	required:
//		id:String (idea)
//response:
// {team:{TeamEntity}}
router.get('/id/:id',teamController.getTeamById);

//path parameters
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
//		member:[id] (user)
//		project: id (project)
//response:
//{team:TeamEntity}
router.post('/update/:id',authenticator.authenticate,teamController.update);

//path parameters
//	required:
//		id:id(team)
//response:
//{success:true}
router.get('/remove/:id',authenticator.authenticate,teamController.removeById);


module.exports = router;