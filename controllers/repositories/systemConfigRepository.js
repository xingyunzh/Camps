/**
 * Created by brillwill on 16/11/8.
 */
var fs = require('fs');
var q = require('q');

var cacheHere = null;

exports.getOSSConfig = function(){
    var deferred = q.defer();
    fs.readFile("/root/keys/camproKeys.json", "utf8", function(err, data){
        if (err) {
            deferred.reject(err);
        }
        else {
            var aliyunOSS = JSON.parse(data).aliyunOSS;
            deferred.resolve(aliyunOSS);
        }
    });

    return deferred.promise;
}

exports.getMongoCredentials = function(){
    var deferred = q.defer();
    fs.readFile("/root/keys/camproKeys.json", "utf8", function(err, data){
        if (err) {
            deferred.reject(err);
        }
        else {
            var mongodb = JSON.parse(data).mongodb;
            deferred.resolve(mongodb);
        }
    });

    return deferred.promise;
}

exports.getTokenSecret = function(){
    var deferred = q.defer();
    fs.readFile("/root/keys/camproKeys.json", "utf8", function(err, data){
        if (err) {
            deferred.reject(err);
        }
        else {
            var jwt = JSON.parse(data).jwt;
            deferred.resolve(jwt);
        }
    });
    return deferred.promise;
}