/**
 * Created by brillwill on 16/9/14.
 */
app.controller("ideaController", ["$scope", "$rootScope", "ideaService", "toaster", "kPageSize", function($scope, $rootScope, ideaService, toaster, kPageSize){
    $scope.ideas = [];
    $scope.total = 0;
    $scope.cardFilter = "all";
    $scope.pageNumber = 0;

    $scope.handleItemClick = function(idea){
        $rootScope.theIdea = idea;
        $rootScope.$state.go("nav.idea-detail", {ideaId:idea._id});
    };

    $scope.$watch("cardFilter", function(value){
       refreshData();
    });

    $scope.hasMore = function(){
        return kPageSize * ($scope.pageNumber + 1) < $scope.total;
    };

    $scope.nextPage = function(){
        refreshData("next");
    }

    function refreshData(more) {
        if (more){
            $scope.pageNumber += 1;
        }
        else {
            $scope.pageNumber = 0;
        }

        var pullingData = null;
        if ($scope.cardFilter == "all"){
            pullingData = ideaService.ideaSource(null, $scope.pageNumber);
        }
        else if($scope.cardFilter == "my") {
            pullingData = ideaService.ideaSourceByInnovator($rootScope.currentUser, $scope.pageNumber);
        }
        else {
            alert("Not Supported yet.");
            return;
        }

        pullingData.then(function(data){
            if (more){
                Array.prototype.push.apply($scope.ideas, data.ideas);
            }
            else {
                $scope.ideas = data.ideas;
            }

            $scope.total = data.total;
        }).catch(function(error){
            if(more){
                $scope.pageNumber -= 1;
            }

            toaster.pop({
                type:"error",
                title:"系统错误",
                body:error,
                timeout:5000
            });
        });
    }

    // refreshData();  first load in $digest of cardFilter watch
}]);


