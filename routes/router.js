
var userAPI = require('./userAPI.js');
var publicAPI = require('./publicAPI.js');

var rootRouter = require("express").Router();

var demoController = require('../controllers/demoController');

module.exports = function(app, contextRoot){
    app.use(contextRoot, rootRouter);

	rootRouter.get('/demo', demoController.demo);
	rootRouter.post('/addDemo', demoController.addDemo);

    //Please make any business router under the rootRouter, so that it will be easy for contextRoot config.

	rootRouter.use("/public", publicAPI);

	rootRouter.use('/api/user',userAPI);

};

