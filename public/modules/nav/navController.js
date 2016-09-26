/**
 * Created by brillwill on 16/9/14.
 */
app.controller("navController", ["$scope", "$rootScope", function($scope, $rootScope){
    $scope.goLogin = function () {
        $rootScope.$state.go("nav.login");
    }

}]);