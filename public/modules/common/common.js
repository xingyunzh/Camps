var kConfirmationHTML = "./modules/common/confirmation.html";
var kModalInputTextHTML = "./modules/common/modal-text-input.html";
var kModalInputUserStoryHTML = "./modules/common/modal-userstory-input.html";
var kModalInputTaskHTML = "./modules/common/modal-task-input.html";
var kModalInputSprintHTML = "./modules/common/modal-sprint-input.html";
var kConfirmationController = 'commonModalController';

app.controller(kConfirmationController, function ($scope, $uibModalInstance, title, content, list) {
	$scope.title = title;
	$scope.modal = {};
	$scope.modal.content = content;
	$scope.modal.list = list;

	$scope.ok = function () {
		 /* body... */ 
		 $uibModalInstance.close($scope.modal.content);
	};

	$scope.cancel = function () {
		 /* body... */ 
		 $uibModalInstance.dismiss("cancel");
	};
});

app.service('httpHelper', function ($http, $q, $rootScope, $timeout) {
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
				$rootScope.$emit("CampsDidReceiveAuthToken");
			}

			if (argument.data.status == "S") {
				deferred.resolve(argument.data.body);
			} else {
				if(argument.data.body == "Invalid token") {
					$timeout(function(){
						$rootScope.$emit("loggedOut");
					});
				}
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
        if (us == null){
            return "";
        }
		return us.as + ',' + us.want + ',' + us.soThat;
	}
});

app.filter("idOfStory",function () {
	return function(us){
        if (us == null){
            return "";
        }
		return us._id.slice(0,1) + "***" + us._id.slice(-4);
	}
});

app.filter("idOfTask", function(){
	return function(task){
		if(task == null){
			return "";
		}
		return task._id.slice(0,1) + "***" + task._id.slice(-4);
	}
});

app.filter("idOfSprint", function(){
	return function(sprint){
		if(sprint == null){
			return "";
		}
		return sprint._id.slice(0,1) + "***" + sprint._id.slice(-4);
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
				},
                list:function(){
                    return null;
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
				},
                list:function(){
                    return null;
                }
			}
		});

		return modalInstance.result;
	};

	this.modalTaskInputStep = function(aTitle, aContent){
		if (aContent.startDate && !(aContent.startDate instanceof Date)){
            aContent.startDate = new Date(aContent.startDate);
        }

		if (aContent.duedate && !(aContent.duedate instanceof Date)){
			aContent.duedate = new Date(aContent.duedate);
		}

		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: kModalInputTaskHTML,
			controller: kConfirmationController,
			size: "lg",
			resolve: {
				title: function() {
					return aTitle;
				},
				content: function() {
					return aContent;
				},
                list:function(){
                    return aContent.candidates;
                }
			}
		});

		return modalInstance.result;
	};

	this.modalSprintInputStep = function(aTitle, aContent, aProjectBacklog){
		if (!(aContent.startDate instanceof Date)){
			aContent.startDate = new Date(aContent.startDate);
		}

		if (!(aContent.endDate instanceof Date)){
			aContent.endDate = new Date(aContent.endDate);
		}

		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: kModalInputSprintHTML,
			controller: kConfirmationController,
			size: "lg",
			resolve: {
				title: function() {
					return aTitle;
				},
				content: function() {
					return aContent;
				},
				list:function(){
					return aProjectBacklog;
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

}]);

app.service("uniqueId", ["httpHelper", "$q", function (httpHelper, $q) {
    this.generateShortId = function(){
        return httpHelper.sendRequest("GET", "./system/shortid");
    }
}])