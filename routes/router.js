
var userAPI = require('./userAPI');
var ideaAPI = require('./ideaAPI');
var publicAPI = require('./publicAPI.js');
var authenticator = require('../authenticate/authenticator.js');

var rootRouter = require("express").Router();

var demoController = require('../controllers/demoController');
var messageController = require('../controllers/messageController');

module.exports = function(app, contextRoot) {
    app.use(contextRoot, rootRouter);

    rootRouter.get('/demo', demoController.demo);
    rootRouter.post('/addDemo', demoController.addDemo);

    //Please make any business router under the rootRouter, so that it will be easy for contextRoot config.
    rootRouter.get('/message', messageController.message);
    rootRouter.post('/sendMessage', messageController.sendMessage);

    //rootRouter.use('/',authenticator.authenticate);
    
	rootRouter.use("/public", publicAPI);

	rootRouter.use('/api/user',userAPI);

	rootRouter.use('/api/idea',ideaAPI);
};

