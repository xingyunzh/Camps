/**
 * Created by brillwill on 16/9/16.
 */
app.controller("teamController", ["$scope", "$rootScope", function($scope, $rootScope){
    $scope.teams = teamData;

    $scope.onTeamClicked = function(team){
        $rootScope.theTeam = teamData[0];

        $rootScope.$state.go("nav.team-detail");
    }
}]);

