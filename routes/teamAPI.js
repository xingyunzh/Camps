var teamController = require('../controllers/teamController');
var authenticator = require('../authenticate/authenticator');
var router = require('express').Router();


//body parameters
//	required:
//		name:String
//	optional:
//		name:String
//		background:String
//		
router.post('/add',authenticator.authenticate,teamController.create);

//query parameters
//	required:
//		id:String (idea)
router.get('/:id',teamController.getTeamById);

router.post('/list',teamController.list);

module.exports = router;