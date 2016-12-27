/**
 * Created by brillwill on 16/9/14.
 */
app.controller("projectController", ["$scope", "$rootScope","projectService", "kPageSize", function($scope, $rootScope, projectService, kPageSize){
    $scope.total = 0;
    $scope.pageNumber = 0;

    (function(){
        refreshData();

    })();

    $scope.hasMore = function(){
        return kPageSize * ($scope.pageNumber + 1) < $scope.total;
    };

    $scope.nextPage = function(){
        refreshData("next");
    };

    $scope.handleProjectClicked = function (project) {
        $rootScope.theProject = project;
        $rootScope.$state.go("nav.project-detail", {projectId:project._id});
    };

    function refreshData(more){
        if(more){
            $scope.pageNumber += 1;
        }
        else {
            $scope.pageNumber = 0;
        }

        projectService.projectSource(null, $scope.pageNumber).then(function(data){
            if(more){
                Array.prototype.push.apply($scope.projects, data.projects);
            }
            else {
                $scope.projects = data.projects;
            }

            $scope.total = data.total;
        }).catch(function(error){
            if(more){
                $scope.pageNumber -= 1;
            }

            toaster.pop({
                type:"error",
                title:"项目",
                body:"获取项目数据失败!" + JSON.stringify(error),
                timeout:500
            });
        });
    };
}]);