var messageRouter = require("express").Router();

var messageController = require('../controllers/messageController');

messageRouter.get('/getting', messageController.getMessage);
messageRouter.post('/sending', messageController.sendMessage);

module.exports = messageRouter;
