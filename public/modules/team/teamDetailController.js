/**
 * Created by brillwill on 16/9/28.
 */
app.controller("teamDetailController", ["$scope", "$rootScope", "util", function ($scope, $rootScope, util) {
    $scope.form = {
        name:$rootScope.theTeam.name,
        description:$rootScope.theTeam.description,
        leader:$rootScope.theTeam.leader,
        members:$rootScope.theTeam.members
    };

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

}]);