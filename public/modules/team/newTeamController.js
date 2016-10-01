/**
 * Created by brillwill on 16/9/28.
 */
app.controller("newTeamController", ["$scope", "$rootScope", "util", function ($scope, $rootScope, util) {
    $scope.form = {
        name: null,
        description: null,
        leader: null,
        members: [],
        teamId: "20160701001",
        isActive: true,
        birthday: new Date("2015-12-12"),
        project: null,
        deactiveDate: null,
        activeDate: new Date("2016-07-01"),
    };

    $scope.onSubmitButton = function () {
        util.confirmationStep("新建","你在同一时刻只能加入一个团队,是否确认自己新建一个团队?")
            .then(function ok() {
                $rootScope.theTeam = $scope.form;

                $rootScope.$state.go("nav.team-detail");
            }, function cancel() {

            })
    }
}]);