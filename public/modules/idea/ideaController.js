/**
 * Created by brillwill on 16/9/14.
 */
app.controller("ideaController", ["$scope", "$rootScope", "ideaService", "toaster", function($scope, $rootScope, ideaService, toaster){
    $scope.ideas = [];
    $scope.cardFilter = "all";

    $scope.handleItemClick = function(idea){
        $rootScope.theIdea = idea;
        $rootScope.$state.go("nav.idea-detail");
    }

    $scope.$watch("cardFilter", function(value){
       refreshData();
    });

    function refreshData() {
        var pullingData = null;
        if ($scope.cardFilter == "all"){
            pullingData = ideaService.ideaSource();
        }
        else if($scope.cardFilter == "my") {
            pullingData = ideaService.ideaSourceByInnovator($rootScope.currentUser);
        }
        else {
            alert("Not Supported yet.");
            return;
        }

        pullingData.then(function(data){
            $scope.ideas = data.ideas;
        }).catch(function(error){
            toaster.pop({
                type:"error",
                title:"系统错误",
                body:error,
                timeout:5000
            });
        });
    }

    refreshData();
}]);


