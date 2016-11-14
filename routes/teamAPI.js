var teamController = require('../controllers/teamController');
var authenticator = require('../authenticate/authenticator');
var router = require('express').Router();


//body parameters
//	required:
//		name:String
//	optional:
//		background:String
//		coach:String (user)
//		lead:String(user)
//		member:[String] (user)
//		project: [String] (project) 暂时未开放
router.post('/add',authenticator.authenticate,teamController.create);

//query parameters
//	required:
//		id:String (idea)
router.get('/:id',teamController.getTeamById);

//body parameters
//	required:
//	optional:
//		pageNum:Number (default:1)
//		pageSize:Number (default:10)
//		keyword:String (for name)
router.post('/list',teamController.list);


//query parameters
//	required:
//		name:String 
router.post('/check/name',teamController.checkNameExist);

//body parameters
//	required:
//	optional:
//		name:String
//		background:String
//		coach:String (user)
//		lead:String(user)
//		member:[String] (user)
//		project: [String] (project) 暂时未开放
router.post('/update/:id',authenticator.authenticate,teamController.update);

module.exports = router;