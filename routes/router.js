
var userAPI = require('./userAPI.js');
var publicAPI = require('./publicAPI.js');
var authenticator = require('../authenticate/authenticator.js');

var rootRouter = require("express").Router();
var messageRouter = require("./messageRouter");

var demoController = require('../controllers/demoController');

module.exports = function(app, contextRoot) {
    app.use(contextRoot, rootRouter);

    rootRouter.get('/demo', demoController.demo);
    rootRouter.post('/addDemo', demoController.addDemo);

    //Please make any business router under the rootRouter, so that it will be easy for contextRoot config.
<<<<<<< HEAD
    rootRouter.use('/message', messageRouter);
=======
    rootRouter.get('/message', messageController.message);
    rootRouter.post('/sendMessage', messageController.sendMessage);

    //rootRouter.use('/',authenticator.authenticate);
    
	rootRouter.use("/public", publicAPI);

	rootRouter.use('/api/user',userAPI);
>>>>>>> master
};

