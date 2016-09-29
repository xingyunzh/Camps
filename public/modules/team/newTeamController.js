/**
 * Created by brillwill on 16/9/28.
 */
app.controller("newTeamController", ["$scope", "$rootScope", "util", function ($scope, $rootScope, util) {
    $scope.form = {};

    $scope.onSubmitButton = function () {
        util.confirmationStep("新建","你在同一时刻只能加入一个团队,是否确认自己新建一个团队?")
            .then(function ok() {
                $rootScope.$state.go("nav.team");
            }, function cancel() {

            })
    }
}]);