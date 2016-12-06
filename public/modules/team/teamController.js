/**
 * Created by brillwill on 16/9/16.
 */
app.controller("teamController", ["$scope", "$rootScope", "teamService", function($scope, $rootScope, teamService){

    teamService.teamSource().then(function(data){
        $scope.teams = data.teams;
    });

    $scope.onTeamClicked = function(team){
        $rootScope.theTeam = teamData[0];

        $rootScope.$state.go("nav.team-detail");
    }
}]);

