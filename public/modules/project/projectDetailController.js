/**
 * Created by brillwill on 16/10/4.
 */
app.controller("projectDetailController", ["$scope", "$rootScope", "util", "teamService", "projectService","toaster",
    function ($scope, $rootScope, util, teamService, projectService, toaster) {
        $scope.isNameEditing = false;
        $scope.form = makeFormOftheProject();
        $scope.list = ["one", "two", "three", "four", "five", "six"];


        $rootScope.theTeam = null;
        teamService.getTeamAsLead($rootScope.theProject.manager).then(function(data){
            $rootScope.theTeam = data.team[0];
        });

        $scope.onDataEdit = function(keys, keyEditing){
            if ($scope[keyEditing]) {
                var param = {};
                for (var i = 0; i < keys.length; i++){
                    param[keys[i]] = $scope.form[keys[i]];
                }

                projectService.update($rootScope.theProject, param).then(function(data){
                    $rootScope.theProject = data.project;

                    $scope[keyEditing] = false;
                }).catch(function(error){
                    toaster.pop({
                        type:"error",
                        title:"修改",
                        body:"系统错误,请稍后再试!",
                        timeout:500
                    });
                });
            }
            else {
                $scope[keyEditing] = true;
            }
        };

        $scope.handleIdeaLink = function () {
            $rootScope.theIdea = $scope.theProject.relatedIdea;
            $rootScope.$state.go("nav.idea-detail");
        };

        $scope.handleTeamLink = function () {
            $rootScope.$state.go("nav.team-detail")
        };



        function makeFormOftheProject() {
            return {
                name: $rootScope.theProject.name,
                scope: $rootScope.theProject.scope,

                backlog: angular.copy($rootScope.theProject.backlog),
                sprints: angular.copy($rootScope.theProject.sprints),
                tasks: angular.copy($rootScope.theProject.tasks)
            }
        }


    }]);