/**
 * Created by Ray on 16/11/8.
 */
app.controller("profileController", ["$scope", "$rootScope", "profileService", "toaster", function ($scope, $rootScope, profileService, toaster) {
    $scope.form = {
        nickname: $rootScope.currentUser.nickname,
        name: $rootScope.currentUser.name
    };

    $scope.roles = {
        playerRole:$rootScope.currentUser.roles.indexOf("player") >= 0,
        coachRole:$rootScope.currentUser.roles.indexOf("coach") >= 0
    };

    $scope.skills = _.reduce($rootScope.currentUser.skills, function (result, item, index) {
        return result += item + ',';
    }, '');
    $scope.skills = $scope.skills.slice(0, -1);

    $scope.onSubmitButton = function () {
        var updateContent = angular.copy($scope.form);
        var roles = [];
        if ($scope.roles.playerRole) {
            roles.push("player");
        }

        if ($scope.roles.coachRole) {
            roles.push("coach");
        }

        if (!_.isEqual($rootScope.currentUser.roles.sort(), roles.sort())) {
            updateContent.roles = roles;
        }

        var skills = $scope.skills.split(',');
        if (!_.isEqual($rootScope.currentUser.skills.sort(), skills.sort())) {
            updateContent.skills = skills;
        }

        if (updateContent.nickname == $rootScope.currentUser.nickname) {
            delete updateContent.nickname;
        }

        if (updateContent.name == $rootScope.currentUser.name) {
            delete updateContent.name;
        }

        if (Object.keys(updateContent).length == 0){
            toaster.pop({
                type:'warning',
                title:'个人资料',
                body:'你没有修改任何信息。请修改后提交',
                timeout:3000
            });

            return;
        }

        toaster.pop(
            {
                type: 'info',
                title: '个人资料',
                body: '正在提交修改,请稍候',
            }
        );
        profileService.updateUser($rootScope.currentUser, updateContent).then(function (data) {
            toaster.clear();
            toaster.pop({
                type:'success',
                title:"资料修改",
                body:'修改成功!',
                timeout:5*1000
            });
            $rootScope.currentUser = data;
        }).catch(function(error){
            toaster.clear();
            toaster.pop({
                type:'error',
                title:"错误",
                body:'出现错误:' + error,
                timeout:5*1000
            });
        });
    }
}]);