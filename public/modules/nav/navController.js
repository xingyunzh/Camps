/**
 * Created by brillwill on 16/9/14.
 */
app.controller("navController", ["$scope", "$rootScope", function($scope, $rootScope){
	$scope.hasLoggedIn = false;

    $scope.goLogin = function () {
        $rootScope.$state.go("nav.login");
    };

    $rootScope.$on('loggedIn',function(){
    	$scope.hasLoggedIn = true;

        $rootScope.$state.go(!!$rootScope.$previousState ? $rootScope.$previousState : "nav.idea");
    });

    $rootScope.$on('loggedOut',function(){
    	$rootScope.currentUser = null;
    	$rootScope.token = null;
    	$scope.hasLoggedIn = false;

        $rootScope.$state.go("nav.idea");
    });

    $rootScope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
        $rootScope.$previousState = from;
        $rootScope.$previousStateParams = fromParams;
    });

    $scope.onTap = function(a){
          
    };
    
    $scope.logOut = function(){
        $rootScope.$emit("loggedOut");
    };
}]);