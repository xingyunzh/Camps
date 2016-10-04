/**
 * Created by brillwill on 16/10/4.
 */
app.controller("projectDetailController", ["$scope", "$rootScope", "util", function ($scope, $rootScope, util) {
    $scope.form = makeFormOftheProject();

    $scope.isEditing = false;
    $scope.onEditButton = function () {
        if ($scope.isEditing){
            util.confirmationStep("提交修改", "是否保存并提交您的修改?")
                .then(function ok() {
                    $scope.isEditing = false;
                }, function cancel() {

                });
        }
        else {
            $scope.isEditing = true;
        }
    }

    $scope.onCancelButton = function () {
        $scope.form = makeFormOftheProject();
        $scope.isEditing = false;
    }
    
    function makeFormOftheProject() {
        return {
            name:$rootScope.theProject.name,
            scope:$rootScope.theProject.scope,
        }
    }
}]);