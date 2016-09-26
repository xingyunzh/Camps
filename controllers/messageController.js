var Message = require('../models/message');
var User = require('../models/user');

exports.sendMessage = function(req, res) {
    console.log(req.body);
    var fromId;
    var toId;
    var msgTitle = req.body.msgTitle;
    var msgContent = req.body.msgContent;

    User.findOne({
        name: req.body.from
    }, function(err, fromUser) {
        if (err) {
            res.json({
                status: "E",
                body: err
            });
        } else {
            User.findOne({
                name: req.body.to
            }, function(err, toUser) {
                if (err) {
                    res.json({
                        status: "E",
                        body: err
                    });
                } else {
                    var message = new Message();
                    message.title = msgTitle;
                    message.content = msgContent;
                    message.from = fromUser._id;
                    message.to = toUser._id;
                    message.createDate = new Date();
                    message.isRead = false;
                    message.isDeleted = false;

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
            });
        }
    });
}

exports.getMessage = function(req, res) {
    var user = req.body.user;
    var selection = req.body.selection; // "all", "read", "unread"

    User.findOne({
        name: req.body.user
    }, function(err, currentUser) {
        if (err) {
            res.json({
                status: "E",
                body: err
            });
        } else {
            if (selection == "all") {
                Message.find({
                    to: currentUser._id
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
            } else {
                Message.find({
                    to: currentUser._id,
                    isRead: (selection == "read" ? true : false)
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
        }
    })
}
