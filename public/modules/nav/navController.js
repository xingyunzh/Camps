/**
 * Created by brillwill on 16/9/14.
 */
app.controller("navController", ["$scope", "$rootScope", "loginService", function($scope, $rootScope, loginService){
    (function initialize(){
        loginService.recoverLoginIfPossible($rootScope);

    })();

    $rootScope.$on('loggedIn',function(){
        loginService.archiveUserInfo(kCampsArchiveKeyUserId, $rootScope.currentUser._id);

        if ($rootScope.$state.is('nav.login')){
            if ($rootScope.$previousState){
                $rootScope.$state.go($rootScope.$previousState, $rootScope.$previousStateParams);
            }
            else {
                $rootScope.$state.go("nav.idea");
            }
        }
    });

    $rootScope.$on('CampsDidReceiveAuthToken', function(){
        loginService.archiveUserInfo(kCampsArchiveKeyAuthToken, $rootScope.token)
    });

    $rootScope.$on('loggedOut',function(){
    	$rootScope.currentUser = null;
    	$rootScope.token = null;
        loginService.removeArchivedUserInfo();

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

    $scope.hasLoggedIn = function () {
        return !!$rootScope.currentUser;
    }
}]);