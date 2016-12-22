/**
 * Created by brillwill on 16/9/28.
 */
app.controller("newTeamController", ["$scope", "$rootScope", "teamService", "util", "toaster",
    function ($scope, $rootScope, teamService, util, toaster) {
        $scope.form = {
            name: null,
            description: null,
            members: [$rootScope.currentUser],
            coach: null
        };

        $scope.nameAvailable = false;

        $scope.onSubmitButton = function () {
            if (!$scope.form.name || !$scope.nameAvailable){
                util.confirmationStep("输入", "团队的名字不能为空。");

                return;
            }

            if (!$scope.form.accepted) {
                util.confirmationStep("输入", "请先接受团队创建协议。");

                return;
            }

            util.confirmationStep("新建", "你在同一时刻只能加入一个团队,是否确认自己新建一个团队?")
                .then(function () {
                    toaster.pop({
                        type: "info",
                        title: "新建",
                        body: "正在提交,请稍候。"
                    });
                    return teamService.add($scope.form);
                })
                .then(function (data) {
                    toaster.clear();

                    $rootScope.theTeam = data.team;
                    $rootScope.$state.go('nav.team-detail', {teamId: data.team._id});
                })
                .catch(function (error) {
                    toaster.clear();
                    toaster.pop({
                        type: "error",
                        title: "错误",
                        body: "系统错误:" + JSON.stringify(error)
                    });
                });
        };

        $scope.onNameChange = function(value){
            teamService.checkName(value).then(function(exist){
                $scope.nameAvailable = !exist;
            });
        };

        $rootScope.$on('UserProfileDidRefresh', function () {
            if (!$scope.form.members[0] || $scope.form.members[0]._id != $rootScope.currentUser._id){
                $scope.form.members.unshift($rootScope.currentUser);
            }
        });
    }]);