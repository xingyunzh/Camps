app.service("loginService", ['httpHelper', function (httpHelper) {
    this.loginByWechat = function (code,callback) {
        httpHelper.sendRequest("POST", "./api/user/login/wechat",{
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

    this.loginByEmail = function (email,password,callback) {
        httpHelper.sendRequest("POST", "./api/user/login/email",{
			email:email,
			password:password
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

	this.archiveUserInfo = function(key, value){
		console.assert(key == kCampsArchiveKeyAuthToken || key == kCampsArchiveKeyUserId, "You are using wrong archive method.");
		window.localStorage.setItem(key, value);
	};

	this.removeArchivedUserInfo = function(key){
		if (!key){
			window.localStorage.removeItem(kCampsArchiveKeyAuthToken);
			window.localStorage.removeItem(kCampsArchiveKeyUserId);
		}
		else {
			window.localStorage.removeItem(key);
		}
	};

	this.recoverLoginIfPossible = function(rootScope){
		var userId = window.localStorage.getItem(kCampsArchiveKeyUserId);
		var token = window.localStorage.getItem(kCampsArchiveKeyAuthToken);
		if(!!userId && !!token){
			rootScope.token = token;

			httpHelper.sendRequest("GET", "./api/user/profile/"+userId).then(function(data){
				rootScope.currentUser = data.user;

				rootScope.$emit('CampsDidFinishAutoLogin');
			}).catch(function(error){
				this.removeArchivedUserInfo();
				$rootScope.currentUser = null;
				$rootScope.token = null;
			});
		}
	};


}]);