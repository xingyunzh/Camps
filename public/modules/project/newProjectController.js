/**
 * Created by brillwill on 16/10/4.
 */
app.controller("newProjectController", ["$scope", "$rootScope", "util", "projectService", "toaster", "teamService",
    function ($scope, $rootScope, util, projectService, toaster, teamService) {
        $scope.form = {};
        $scope.checked = false;

        $scope.onIdeaSelected = function(idea){
            $scope.form.relatedIdea = idea._id;
            $scope.ideaName=idea.name
        }

        $scope.onSubmitButton = function () {
            if(!$scope.checked){
                alert("请先阅读并同意创建条款。");
                return;
            }

            if(!$rootScope.currentUser){
                alert("请先登录!");
                return;
            }

            util.confirmationStep("新建", "你团队在同一时刻只能开始一个项目,是否确认自己新建一个项目?")
                .then(function () {
                    toaster.pop({
                        type: "info",
                        title: "新建",
                        body: "正在为您新建项目,请稍候...",
                    });

                    teamService.getTeamByMember($rootScope.currentUser).then(function(data) {
                        var myTeam = data.team;
                        $scope.form.team = myTeam._id;
                        return projectService.add($scope.form).then(function (data) {
                            toaster.clear();
                            if (data.project) {
                                $rootScope.theProject = data.project;
                                $rootScope.$state.go("nav.project-detail", {projectId:data.project._id});
                                toaster.pop({
                                    type: "success",
                                    title: "新建",
                                    body: "项目新建成功!",
                                    timeout: 5000
                                });

                                return true;
                            }
                            else {
                                throw "no project created!" + JSON.stringify(data);
                            }
                        })
                    })
                    .catch(function (error) {
                        toaster.clear();
                        toaster.pop({
                            type: "error",
                            title: "新建",
                            body: "项目新建失败,请稍后再试。" + error,
                            timeout: 5000
                        });
                    });
                });
        }
    }]);