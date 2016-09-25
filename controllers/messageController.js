var Message = require('../models/message');

exports.demo = function(req, res) {
    Message.find(function(err, data) {
        if (err) {
            res.json({
                status: "E",
                body: err
            });
        } else {
            res.json({
                status: "S",
                body: data
            });
        }
    });
}

exports.sendMessage = function(req, res) {
    var fromId = req.body.fromId;
    var toId = req.body.toId;
    var msgTitle = req.body.msgTitle;
    var msgContent = req.body.msgContent;

    var message = new Message();
    message.title = msgTitle;
    message.content = msgContent;
    message.from = fromId;
    message.to = toId;
    message.createDate = new Date();
    message.isRead = false;

    message.save(function(err, data) {
        if (err) {
            res.json({
                status: "E",
                body: err
            });
        } else {
            res.json({
                status: "S",
                body: data
            });
        }
    });
}

exports.message = function(req, res) {
    var user = req.body.user;
    var selection = req.body.selection; // "all", "read", "unread"

    Message.find({
        to: user,
        selection: selection
    }, function(err, data) {
        if (err) {
            res.json({
                status: "E",
                body: err
            });
        } else {
            res.json({
                status: "S",
                body: data
            });
        }
    })
}
