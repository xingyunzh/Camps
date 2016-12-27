/**
 * Created by brillwill on 16/9/14.
 */
app.controller("messageController", ["$scope", "$rootScope", "httpHelper", "teamService","ideaService",
    function($scope, $rootScope, httpHelper, teamService, ideaService) {
        var initialized = false;

        (function(){
            if ($rootScope.currentUser){
                init();
            }
            else {
                $rootScope.$on("CampsDidFinishAutoLogin", function(){
                    if(!initialized){
                        init();
                    }
                })
            }
        })();



        function init(){
            teamService.getTeamByMember($rootScope.currentUser).then(function(team){
                $rootScope.theTeam = team;
                $rootScope.theProject = team.project;
            });

            ideaService.ideaSourceByInnovator($rootScope.currentUser, -1).then(function(data){
                $scope.myIdeas = data.ideas;
            });

            initialized = true;
        };

        // $scope.sendMessage = function() {
        //     httpHelper.sendRequest("POST", "./message/sending", {
        //         from: "admin",
        //         to: "morris.liu",
        //         msgTitle: "Hello",
        //         msgContent: "Welcome to our site"
        //     }).then(function success(data) {
        //         console.log(data);
        //     }, function fail() {
        //         console.log("FAIL");
        //     });
        // }
        //
        // $scope.getMessage = function() {
        //     httpHelper.sendRequest("POST", "./message/getting", {
        //         user: "morris.liu",
        //         selection: "all"
        //     }).then(function success(data) {
        //         $scope.msgs = data;
        //     }, function fail() {
        //         $scope.msgs = [];
        //     });
        // }
    }
]);
