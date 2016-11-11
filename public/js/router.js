/**
 * Created by brillwill on 16/9/14.
 */
app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/nav/idea");
    $stateProvider.state("nav", {
            url: "/nav",
            templateUrl: "./modules/nav/nav.html",
            controller: "navController",
            abstract: true,
        })
        .state("nav.idea", {
            url: "/idea",
            templateUrl: "./modules/idea/idea.html",
            controller: "ideaController"
        })
        .state("nav.createIdea", {
            url: "/createIdea",
            templateUrl: "./modules/idea/new-idea.html",
            controller: "newIdeaController"
        })
        .state("nav.idea-detail", {
            url:"/idetail",
            templateUrl:"./modules/idea/idea-detail.html",
            controller:"ideaDetailController"
        })
        .state("nav.project", {
            url: "/project",
            templateUrl: "./modules/project/project.html",
            controller: "projectController"
        })
        .state("nav.createProject", {
            url:"/createProject",
            templateUrl:"./modules/project/new-project.html",
            controller:"newProjectController"
        })
        .state("nav.project-detail", {
            url:"/pdetail",
            templateUrl:"./modules/project/project-detail.html",
            controller:"projectDetailController"
        })
        .state("nav.team", {
            url: "/team",
            templateUrl: "./modules/team/team.html",
            controller: "teamController"
        })
        .state("nav.createTeam", {
            url:"/createTeam",
            templateUrl:"./modules/team/new-team.html",
            controller:"newTeamController"
        })
        .state("nav.team-detail", {
            url: "/tdetail",
            templateUrl:"./modules/team/team-detail.html",
            controller: "teamDetailController"
        })
        .state("nav.coach", {
            url: "/coach",
            templateUrl: "./modules/coach/coach.html",
            controller: "coachController"
        })
        .state("nav.player", {
            url: "/player",
            templateUrl: "./modules/player/player.html",
            controller: "playerController"
        })
        .state("nav.asset", {
            url: "/asset",
            templateUrl: "./modules/asset/asset.html",
            controller: "assetController"
        })
        .state("nav.message", {
            url: "/message",
            templateUrl: "./modules/message/message.html",
            controller: "messageController"
        })
        .state("nav.login", {
            url: "/login",
            templateUrl: "./modules/login/login.html",
            controller: "loginController"
        })
        .state("nav.profile", {
            url: "/profile",
            templateUrl: "./modules/profile/profile.html",
            controller: "profileController"
        });


}]);
