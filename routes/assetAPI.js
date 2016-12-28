var assetController = require('../controllers/assetController');
var authenticator = require('../authenticate/authenticator');
var router = require('express').Router();


//body parameters
//	required:
//		name:String
//	optional:
//		category:String
//		guide:String
//		demo:String
//response:
// {asset:{AssetEntity}}
router.post('/add',authenticator.authenticate,assetController.create);

//path parameters
//	required:
//		id:String (idea)
//response:
// {asset:{AssetEntity}}
router.get('/id/:id',assetController.getAssetById);


//query  parameters
//	required:
//	optional:
//		pageNum:Number (default:0)
//		pageSize:Number (default:10)
//		keyword:String (for name)
//		category:String
//		maintainer:id (User)
//response:
// {total:totalNumber,assets:[AssetEntities]}
router.get('/list',assetController.list);


//query parameters
//	required:
//		name:String 
//response:
//{exist:true/false}
router.get('/check',assetController.checkExist);

//body parameters
//	required:
//	optional:
//		name:String
//		category:String
//		guide:String
//		demo:String
//response:
//{asset:AssetEntity}
router.post('/update/:id',authenticator.authenticate,assetController.update);



module.exports = router;