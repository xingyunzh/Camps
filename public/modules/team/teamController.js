/**
 * Created by brillwill on 16/9/16.
 */
app.controller("teamController", ["$scope", "$rootScope", "teamService", function($scope, $rootScope, teamService){

    teamService.teamSource().then(function(teams){
        $scope.teams = teams;
    });

    $scope.onTeamClicked = function(team){
        $rootScope.theTeam = team;
        $rootScope.$state.go("nav.team-detail", {teamId:team._id});
    }
}]);

