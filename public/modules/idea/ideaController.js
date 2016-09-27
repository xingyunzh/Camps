/**
 * Created by brillwill on 16/9/14.
 */
app.controller("ideaController", ["$scope", "$rootScope", function($scope, $rootScope){
    $scope.ideas = ideaData;

    $scope.handleItemClick = function(idea){
        $rootScope.theIdea = idea;
        $rootScope.$state.go("nav.idea-detail");
    }

}]);


