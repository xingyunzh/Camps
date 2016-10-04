/**
 * Created by brillwill on 16/9/14.
 */
app.controller("projectController", ["$scope", "$rootScope", function($scope, $rootScope){
    $scope.projects = projectData;

    $scope.handleProjectClicked = function (project) {
        $rootScope.theProject = project;
        $rootScope.$state.go("nav.project-detail");
    }
}]);