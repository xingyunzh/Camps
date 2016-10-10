/**
 * Created by brillwill on 16/10/4.
 */
app.controller("projectDetailController", ["$scope", "$rootScope", "util", "ideaService", function ($scope, $rootScope, util, ideaService) {
    $scope.form = makeFormOftheProject();
    $scope.temp = {
        x:"X"
    };
    $scope.agileBoard = {
        isSprintsOpen:true
    }

    $scope.isEditing = false;
    $scope.idea = {};

    ideaService.getIdeaById($rootScope.theProject.idea).then(function ok(data) {
        $scope.idea = data;
    }, function fail(data) {
        $scope.idea = {};
    });

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
        $scope.form = makeFormOftheProject();
        $scope.isEditing = false;
    }

    $scope.tasksOfStory = function(tasks, story){
        return _.filter(tasks, function(task){
            return task.userStory.id === story.id;
        });
    }

    $scope.handleIdeaLink = function () {
        $rootScope.theIdea = $scope.idea;
        $rootScope.$state.go("nav.idea-detail");
    }

    $scope.handleTeamLink = function () {
        $rootScope.theTeam = $scope.theProject.team;
        $rootScope.$state.go("nav.team-detail")
    }

    
    function makeFormOftheProject() {
        return {
            name:$rootScope.theProject.name,
            scope:$rootScope.theProject.scope,

            backlog:angular.copy($rootScope.theProject.backlog),
            sprints:angular.copy($rootScope.theProject.sprints),
            tasks:angular.copy($rootScope.theProject.tasks)
        }
    }
}]);