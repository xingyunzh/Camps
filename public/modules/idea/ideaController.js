/**
 * Created by brillwill on 16/9/14.
 */
app.controller("ideaController", ["$scope", "$rootScope", "ideaService", "toaster", function($scope, $rootScope, ideaService, toaster){
    $scope.ideas = [];

    ideaService.ideaSource().then(function(data){
        $scope.ideas = data.ideas;
    }).catch(function(error){
        toaster.pop({
            type:"error",
            title:"系统错误",
            body:error,
            timeout:5000
        });
    });

    $scope.handleItemClick = function(idea){
        $rootScope.theIdea = idea;
        $rootScope.$state.go("nav.idea-detail");
    }
    
}]);


