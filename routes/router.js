
var userAPI = require('./userAPI');
var ideaAPI = require('./ideaAPI');

var rootRouter = require("express").Router();
var messageRouter = require("./messageRouter");
var systemConfigRouter = require("./systemConfigRouter");

var demoController = require('../controllers/demoController');

module.exports = function(app, contextRoot) {
    app.use(contextRoot, rootRouter);

    rootRouter.get('/demo', demoController.demo);
    rootRouter.post('/addDemo', demoController.addDemo);

    //Please make any business router under the rootRouter, so that it will be easy for contextRoot config.

    rootRouter.use('/message', messageRouter);

    rootRouter.use('/system', systemConfigRouter);
    
    //rootRouter.use('/api',authenticator.authenticate);

	rootRouter.use('/api/user',userAPI);

	rootRouter.use('/api/idea',ideaAPI);

};
