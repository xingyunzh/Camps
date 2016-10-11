var Item = require('../models/item');
var util = require('../util/util.js');
var fs = require('fs');
var oss = require('ali-oss');

exports.demo = function(req, res){
	Item.find(function(err, data){
		if (err) {
			res.json({status:"E", body:err});
		}
		else {
			res.json({status:"S", body:data});
		}
	});
}

exports.addDemo = function(req, res){
	var name = req.body.name;
	var desc = req.body.desc;

	var item = new Item();
	item.name = name;
	item.content = desc;

	item.save(function(err, data) {
		if (err) {
			res.json({status:"E", body:err});
		}
		else {
			res.json({status:"S", body:data});
		}
	});
}

exports.getAliyunAccess = function (req, res) {
    fs.readFile("/root/keys/camproKeys.json", "utf8", function(err, data){
        if (err) {
            res.json(util.wrapBody(err, 'E'));
        }
        var aliyun = JSON.parse(data).aliyun;

        res.json(util.wrapBody(aliyun));
    });
}

exports.listFile = function(req, res) {
    fs.readFile("/root/keys/camproKeys.json", "utf8", function(err, data){
        if (err) {
            res.json(util.wrapBody(err, 'E'));
        }
        var aliyun = JSON.parse(data).aliyun;

        var accessKeyId = aliyun.accessKeyId;
        var accessKeySecret = aliyun.accessKeySecret;
        var client = new oss.Wrapper({
            region: 'oss-cn-shanghai',
            accessKeyId: accessKeyId,
            accessKeySecret: accessKeySecret,
            bucket: 'campro'
        });

        client.list().then(function(data){
            res.json(util.wrapBody(data));
        }, function(data){
            res.json(util.wrapBody(data, "E"));
        })
        
    });
}

