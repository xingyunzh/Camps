var rootRouter = require("express").Router();

var demoController = require('../controllers/demoController');

module.exports = function(app, contextRoot){
    app.use(contextRoot, rootRouter);

	rootRouter.get('/demo', demoController.demo);
	rootRouter.post('/addDemo', demoController.addDemo);

};