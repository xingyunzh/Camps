var kConfirmationHTML = "./modules/common/confirmation.html";
var kModalInputTextHTML = "./modules/common/modal-text-input.html";
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
			if (argument.data.status == "S") {
				deferred.resolve(argument.data.body);
			} else {
				deferred.reject(argument.data.status);
			};
		}, function fail(argument) {
			deferred.reject(argument.statusText);
		});

		return deferred.promise;
	};

});


app.filter("nameOfStory",function () {
	return function(us){
		return "US:"+ us.as + ',' + us.do + ',' + us.then;
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
		 	};
		 };

		 return -1;
	};

	this.keyForValue = function (obj, value) {
		for(key in obj){
			if (obj[key] === value) {
				return key;
			};
		}

		return null;
	};

	this.confirmationStep = function(aTitle, aConent) {
		var deferred = $q.defer();

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

		modalInstance.result.then(function ok() {
			deferred.resolve("ok");
		}, function cancel(argument) {
			deferred.reject("cancel");
		});

		return deferred.promise;
	};

	this.modalTextInputStep = function (aTitle, aConent) {
		var deferred = $q.defer();

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

		modalInstance.result.then(function ok(content) {
			deferred.resolve(content);
		}, function cancel(argument) {
			deferred.reject("cancel");
		});

		return deferred.promise;
	};

    this.globalNameForFile = function (filename, user) {
        if (user) {
            return 'u'+user.uid+'_'+filename;
        }
        return 'g'+'_'+filename;
    };

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