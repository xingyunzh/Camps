/**
 * Created by brillwill on 16/10/12.
 */
var util = require('../util/util.js');
var fs = require('fs');
var shortID = require('shortid');

exports.getOSSConfig = function(req, res){
    fs.readFile("/root/keys/camproKeys.json", "utf8", function(err, data){
        if (err) {
            res.json(util.wrapBody(err, 'E'));
        }
        var aliyunOSS = JSON.parse(data).aliyunOSS;

        res.json(util.wrapBody(aliyunOSS));
    });
}

exports.getShortID = function (req, res) {
    res.json(util.wrapBody(shortID.generate()));
}