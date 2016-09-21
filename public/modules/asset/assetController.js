/**
 * Created by brillwill on 16/9/14.
 */
app.controller("assetController", ["$scope", "$rootScope", "httpHelper", function($scope, $rootScope, httpHelper){
    $scope.items = [];
    $scope.isError = false;

    $scope.onRefresh = function () {
        httpHelper.sendRequest("GET", "/demo").then(function success(data) {
            $scope.items = data;
            $scope.isError = false;
        },function fail(){
            $scope.isError = true;
            $scope.items = [];
        });
    }

}]);