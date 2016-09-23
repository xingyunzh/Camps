/**
 * Created by brillwill on 16/9/23.
 */
app.controller("newIdeaController", ["$scope", "$rootScope", "util", function($scope, $rootScope, util) {
    $scope.form = {};
    
    $scope.onSaveButton = function () {
        $rootScope.$state.go("nav.idea");
    }
    
    $scope.onSubmitButton = function () {
        util.confirmationStep("新建创意", "是否提交您的创意到后台审核?").then(function ok(){
            $rootScope.$state.go("nav.idea");
        }, function fail() {
            console.log("form="+JSON.stringify($scope.form));
        })
    }
    
}]);