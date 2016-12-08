/**
 * Created by brillwill on 16/9/28.
 */
app.controller("newTeamController", ["$scope", "$rootScope", "teamService", "util", "toaster",
    function ($scope, $rootScope, teamService, util, toaster) {
    $scope.form = {
        name: null,
        description: null,
        lead: $rootScope.currentUser,
        member: [],
        coach:null
    };

    $scope.onSubmitButton = function () {
        util.confirmationStep("新建","你在同一时刻只能加入一个团队,是否确认自己新建一个团队?")
            .then(function () {
                toaster.pop({
                    type:"info",
                    title:"新建",
                    body:"正在提交,请稍候。"
                });
                return teamService.add($scope.form);
            })
            .then (function (data) {
                toaster.clear();

                $rootScope.theTeam = data.team;
                $rootScope.$state.go('nav.team-detail');
            })
            .catch(function (error){
                toaster.clear();
                toaster.pop({
                    type:"error",
                    title:"错误",
                    body:"系统错误:"+ JSON.stringify(error)
                });
            });
    };
}]);