/**
 * Created by brillwill on 16/10/12.
 */
var util = require('../util/util.js');
var fs = require('fs');

exports.getOSSConfig = function(req, res){
    fs.readFile("/root/keys/camproKeys.json", "utf8", function(err, data){
        if (err) {
            res.json(util.wrapBody(err, 'E'));
        }
        var aliyunOSS = JSON.parse(data).aliyunOSS;

        res.json(util.wrapBody(aliyunOSS));
    });
}