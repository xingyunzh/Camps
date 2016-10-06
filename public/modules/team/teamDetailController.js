/**
 * Created by brillwill on 16/9/28.
 */
app.controller("teamDetailController", ["$scope", "$rootScope", "util", function ($scope, $rootScope, util) {
    $scope.form = makeFormOfTheTeam();

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
        $scope.form = makeFormOfTheTeam();
        $scope.isEditing = false;
    }

    $scope.onAddMemeberToForm = function (user) {
        for (var i = 0; i < $scope.form.members.length; i++) {
            if ($scope.form.members[i].uid == user.uid) {
                return;
            }
        }

        $scope.form.members.push(user);
    }

    function makeFormOfTheTeam(){
        return {
            name:$rootScope.theTeam.name,
            description:$rootScope.theTeam.description,
            leader:angular.copy($rootScope.theTeam.leader),
            members:$rootScope.theTeam.members.slice(),
            coach:angular.copy($rootScope.theTeam.coach),
        };
    }

}]);