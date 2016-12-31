/**
 * Created by brillwill on 16/9/16.
 */
app.controller("teamController", ["$scope", "$rootScope", "teamService", "toaster", "kPageSize", function($scope, $rootScope, teamService, toaster, kPageSize){
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

    $scope.onTeamClicked = function(team){
        $rootScope.theTeam = team;
        $rootScope.$state.go("nav.team-detail", {teamId:team._id});
    };

    function refreshData(more){
        if (more){
            $scope.pageNumber += 1;
        }
        else {
            $scope.pageNumber = 0;
        }

        teamService.teamSource(null, $scope.pageNumber).then(function(data){
            if (more){
                Array.prototype.push.apply($scope.teams, data.teams);
            }
            else {
                $scope.teams = data.teams;
            }

            $scope.total = data.total;
        }).catch(function(error){
            if (more){
                $scope.pageNumber -= 1;
            }

            toaster.pop({
                type:"error",
                title:"团队",
                body:"获取数据失败!"+JSON.stringify(error),
                timeout:500
            });
        });
    };

}]);

