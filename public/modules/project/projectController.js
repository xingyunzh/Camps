/**
 * Created by brillwill on 16/9/14.
 */
app.controller("projectController", ["$scope", "$rootScope","projectService", function($scope, $rootScope, projectService){
    projectService.projectSource().then(function(projects){
        $scope.projects = projects;
    });

    $scope.handleProjectClicked = function (project) {
        $rootScope.theProject = project;
        $rootScope.$state.go("nav.project-detail", {projectId:project._id});
    };
}]);