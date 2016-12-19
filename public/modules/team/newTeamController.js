/**
 * Created by brillwill on 16/9/28.
 */
app.controller("newTeamController", ["$scope", "$rootScope", "teamService", "util", function ($scope, $rootScope, teamService, util) {
    $scope.form = {
        name: null,
        description: null,
        members: [$rootScope.currentUser],
        coach:null
    };

    $scope.onSubmitButton = function () {
        util.confirmationStep("新建","你在同一时刻只能加入一个团队,是否确认自己新建一个团队?")
            .then(function () {
                return teamService.add($scope.form);
            })
            .then (function (data) {
                $rootScope.theTeam = data.team;
                $rootScope.$state.go('nav.team-detail');
            })
            .catch(function (error){
                console.log("Creation error:"+error.toString());
            });
    };
}]);