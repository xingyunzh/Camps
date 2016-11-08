/**
 * Created by brillwill on 16/9/14.
 */
app.controller("navController", ["$scope", "$rootScope", function($scope, $rootScope){
	$scope.hasLoggedIn = false;
	$scope.showing = {
		nickname:'default'
	};

    $scope.goLogin = function () {
        $rootScope.$state.go("nav.login");
    };

    $rootScope.$on('loggedIn',function(){
    	$scope.hasLoggedIn = true;
    	$scope.showing.nickname = $rootScope.currentUser.nickname;
    });

    $rootScope.$on('loggedOut',function(){
    	$rootScope.currentUser = null;
    	$rootScope.token = null;
    	$scope.hasLoggedIn = false;
    });

    $scope.logOut = function(){
    	$rootScope.currentUser = null;
    	$rootScope.token = null;
    	$scope.hasLoggedIn = false;
    };
}]);