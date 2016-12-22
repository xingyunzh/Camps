/**
 * Created by brillwill on 16/9/28.
 */
app.controller("teamDetailController", ["$scope", "$rootScope","$stateParams", "util", "projectService", "teamService", "toaster",
    function ($scope, $rootScope, $stateParams, util, projectService, teamService, toaster) {
        $scope.form = {};
        $scope.isEditing = false;

        (function initialize(){
            if($rootScope.theTeam && $rootScope.theTeam._id == $stateParams.teamId){
                $scope.form = makeFormOfTheTeam();

                return;
            }

            if ($stateParams.teamId){
                teamService.getTeamById($stateParams.teamId).then(function(data){
                    $rootScope.theTeam = data.team;
                    $scope.form = makeFormOfTheTeam();
                }).catch(function(error){
                    toaster.pop({
                        type:"error",
                        title:"系统错误",
                        body:JSON.stringify(error),
                        timeout:500
                    });
                });
            }
        })();

        $scope.onEditButton = function () {
            if ($scope.isEditing) {
                util.confirmationStep("提交修改", "是否保存并提交您的修改?")
                    .then(function ok() {
                        toaster.pop(
                            {
                                type: 'info',
                                title: '团队资料',
                                body: '正在提交修改,请稍候',
                            }
                        );
                        teamService.update($rootScope.theTeam, $scope.form).then(function (data) {
                            $scope.theTeam = data.team;
                            $scope.form = makeFormOfTheTeam();
                            toaster.clear();
                            toaster.pop({
                                type: 'success',
                                title: "资料修改",
                                body: '修改成功!',
                                timeout: 5 * 1000
                            });

                            $scope.isEditing = false;
                        }).catch(function (error) {
                            toaster.clear();
                            toaster.pop({
                                type: 'error',
                                title: "资料修改",
                                body: '系统错误,请稍后再试。',
                                timeout: 5 * 1000
                            });
                        });

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
    
    $scope.handleProjectLink = function () {
        projectService.getProjectById($rootScope.theTeam.project.id).then(function ok(data) {
            $rootScope.theProject = data;
            $rootScope.$state.go("nav.project-detail");
        }, function fail() {
           util.confirmationStep("错误", "项目不存在");
        });
    }

    function makeFormOfTheTeam(){
        return {
            name:$rootScope.theTeam.name,
            description:$rootScope.theTeam.description,
            members:$rootScope.theTeam.members,
            coach:angular.copy($rootScope.theTeam.coach),
        };
    }


    }]);