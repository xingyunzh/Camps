app.service("profileService", ['httpHelper', function (httpHelper) {
    this.getProfile = function(callback) {
    	httpHelper.sendRequest("POST", "./api/user/profile",{
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
    }

	this.updateUser = function(user, updateContent) {
		return httpHelper.sendRequest("POST", "./api/user/profile/update/"+user._id, updateContent);
	}

}]);