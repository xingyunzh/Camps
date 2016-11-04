app.service("loginService", ['httpHelper', function (httpHelper) {
    this.loginByWechat = function (code,callback) {
        httpHelper.sendRequest("POST", "./public/login/wechat",{
			code:code
		}).then(function success(data) {
			if (data.user != null) {
				callback(null,data);
			} else {
				callback(new Error('Invalid Credentials'));
			}
            
        },function fail(err){
            callback(err);
        });
    };
}]);