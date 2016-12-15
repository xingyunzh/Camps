var kConfirmationHTML = "./modules/common/confirmation.html";
var kModalInputTextHTML = "./modules/common/modal-text-input.html";
var kModalInputUserStoryHTML = "./modules/common/modal-userstory-input.html";
var kConfirmationController = 'commonModalController';

app.controller(kConfirmationController, function ($scope, $uibModalInstance, title, content) {
	$scope.title = title;
	$scope.modal = {};
	$scope.modal.content = content;

	$scope.ok = function () {
		 /* body... */ 
		 $uibModalInstance.close($scope.modal.content);
	};

	$scope.cancel = function () {
		 /* body... */ 
		 $uibModalInstance.dismiss("cancel");
	};
});

app.service('httpHelper', function ($http, $q, $rootScope) {
	this.sendRequest = function(method, url, data) {
		var req = {
			"method": method,
			"url": url,
			headers: {
				"Content-Type": "application/json",
				"x-access-token" : $rootScope.token
			},
			"data": data
		};

		var deferred = $q.defer();
		$http(req).then(function success(argument) {
			var token = argument.headers('set-token');
			if (!!token) {
				$rootScope.token = token;
			}

			if (argument.data.status == "S") {
				deferred.resolve(argument.data.body);
			} else {
				deferred.reject(argument.data.body);
			}
		}, function fail(argument) {
			deferred.reject(argument.statusText);
		});

		return deferred.promise;
	};
});


app.filter("nameOfStory",function () {
	return function(us){
		return us.as + ',' + us.want + ',' + us.soThat;
	}
});

app.filter('htmlConent', ['$sce', function($sce){
	return function(input){
		return $sce.trustAsHtml(input);
	}
}]);

app.service('util', ["$q", "$uibModal", function ($q, $uibModal) {
	this.indexOfObject = function (array, object, equlFunc) {
		 var i = 0;
		 for (i = array.length - 1; i >= 0; i--) {
		 	if (equlFunc(array[i], object)) {
		 		return i;
		 	}
		 }

		 return -1;
	};

	this.keyForValue = function (obj, value) {
		for(key in obj){
			if (obj[key] === value) {
				return key;
			}
		}

		return null;
	};

	this.confirmationStep = function(aTitle, aConent) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: kConfirmationHTML,
			controller: kConfirmationController,
			size: "sm",
			resolve: {
				title: function() {
					return aTitle;
				},
				content: function() {
					return aConent;
				}
			}
		});

		return modalInstance.result;
	};

	this.modalTextInputStep = function (aTitle, aConent) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: kModalInputTextHTML,
			controller: kConfirmationController,
			size: "lg",
			resolve: {
				title: function() {
					return aTitle;
				},
				content: function() {
					return aConent;
				}
			}
		});

		return modalInstance.result;
	};

	this.modalUserStoryInputStep = function (aTitle, aContent) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: kModalInputUserStoryHTML,
			controller: kConfirmationController,
			size: "lg",
			resolve: {
				title: function() {
					return aTitle;
				},
				content: function() {
					return aContent;
				}
			}
		});

		return modalInstance.result;
	};


    this.globalNameForFile = function (filename, user) {
        if (user) {
            return 'u'+user.uid+'_'+filename;
        }
        return 'g'+'_'+filename;
    };

	this.rawNameFromGlobalName = function(globalName){
		if (globalName.startsWith("g_")){
			return globalName.substring(2);
		}
		else if(globalName.search(RegExp('^u[a-zA-Z0-9]{24}_')) > -1) {
			return globalName.substring(26);
		}
		else {
			return globalName;
		}
	}

    this.promiseWithReject = function(data) {
        var deferred = $q.defer();
        setTimeout(function () {
            deferred.reject(data);
        }, 0);

        return deferred.promise;
    };

    this.promiseWithResolve = function (data) {
        var deferred = $q.defer();
        setTimeout(function () {
            deferred.resolve(data);
        }, 0);

        return deferred.promise;
    }
}]);

app.service("defaultImageService", ["httpHelper","$q","$rootScope", function(httpHelper,$q,$rootScope){
	this.getImagesByType = function(type){
		var deferred = $q.defer();

		if (!!$rootScope.defaultImages[type]) {
			deferred.resolve($rootScope.defaultImages[type]);
		}else{
			httpHelper.sendRequest('GET','./api/image/type/' + type).then(function(data){
				$rootScope.defaultImages[type] = data;
				deferred.resolve(data);
			}).catch(function(err){
				deferred.reject(err);
			});
		}

		return deferred.promise;
	};
}]);


app.service("ossFileService", ["httpHelper", "$q", "util", function (httpHelper, $q, util) {
    //This is for oss requirement. bt..
    function progressFuncMaker(func){
        if(func == null){
            return null;
        }

        return function (p) {
            return function (done){
                func(p);
                done();
            }
        }
    }

    this.getClient = function(){
    	return httpHelper.sendRequest('GET','./system/oss').then(function ok(data){
    		var client = new OSS.Wrapper(data);
    		return client;
    	});
    };

    this.uploadFileWithClient = function(client,name,file,progressFunc){
    	return client.multipartUpload(name,file, {
    		progress:progressFuncMaker(progressFunc)
    	}).then(function ok(data){
             //bug fix for oss sdk: sometimes it misses the "url" property
             if (data.url == null){
                 data.url = data.res.requestUrls[0].split('?')[0];
             }
             return util.promiseWithResolve(data);
        });
    };

    this.deleteFileWithClient = function(client,name){
    	return client.delete(name).then(function ok(data){
             return util.promiseWithResolve(data);
        });
    };

    this.uploadFile = function (name, file, progressFunc) {
         if (file == null){
             return util.promiseWithReject("file is undefined!");
         }
        else {
             return httpHelper.sendRequest("GET", "./system/oss")
                 .then(function ok(data) {
                     var client = new OSS.Wrapper(data);

                     return client.multipartUpload(name,file, {progress:progressFuncMaker(progressFunc)}).then(function ok(data){
                         //bug fix for oss sdk: sometimes it misses the "url" property
                         if (data.url == null){
                             data.url = data.res.requestUrls[0].split('?')[0];
                         }
                         return util.promiseWithResolve(data);
                     });
                 });
         }
    }

}]);

app.service("uniqueId", ["httpHelper", "$q", function (httpHelper, $q) {
    this.generateShortId = function(){
        return httpHelper.sendRequest("GET", "./system/shortid");
    }
}])