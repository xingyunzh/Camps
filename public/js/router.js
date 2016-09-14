/**
 * Created by brillwill on 16/9/14.
 */
app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.when("", "/idea");
    $stateProvider.state("nav", {
        url:"/nav",
        templateUrl:"/modules/nav/nav.html",
        controller:"navController",
        abstract:true,
    })
        .state("nav.idea", {
            url:"/idea",
            templateUrl:"/modules/idea/idea.html",
            controller : "ideaController"
        })
        .state("nav.project", {
            url:"/project",
            templateUrl:"/modules/project/project.html",
            controller : "projectController"
        })
        .state("nav.coach", {
            url:"/coach",
            templateUrl:"/modules/coach/coach.html",
            controller : "coachController"
        })
        .state("nav.player", {
            url:"/player",
            templateUrl:"/modules/player/player.html",
            controller : "playerController"
        })
        .state("nav.asset", {
            url:"/asset",
            templateUrl:"/modules/asset/asset.html",
            controller : "assetController"
        })
        .state("login", {
            url : "/login",
            templateUrl : "/modules/login/login.html",
            controller: "loginController"
        })


}]);