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
            controller: "ideaController",
            data:{
                title:"创意  让世界变得更美好",
                nav : "idea"
            }
        })
        .state("nav.createIdea", {
            url: "/createIdea",
            templateUrl: "./modules/idea/new-idea.html",
            controller: "newIdeaController",
            data:{
                nav:"idea"
            }
        })
        .state("nav.idea-detail", {
            url:"/idetail",
            templateUrl:"./modules/idea/idea-detail.html",
            controller:"ideaDetailController",
            data:{
                nav:"idea"
            }
        })
        .state("nav.project", {
            url: "/project",
            templateUrl: "./modules/project/project.html",
            controller: "projectController",
            data:{
                title:"项目 让我们动手来让这些创新落地",
                nav:"project"
            }
        })
        .state("nav.createProject", {
            url:"/createProject",
            templateUrl:"./modules/project/new-project.html",
            controller:"newProjectController",
            data:{
                nav:"project"
            }

        })
        .state("nav.project-detail", {
            url:"/pdetail",
            templateUrl:"./modules/project/project-detail.html",
            controller:"projectDetailController",
            data:{
                nav:"project"
            }
        })
        .state("nav.team", {
            url: "/team",
            templateUrl: "./modules/team/team.html",
            controller: "teamController",
            data:{
                title:"团队 真正的teamwork",
                nav:"team"
            }
        })
        .state("nav.createTeam", {
            url:"/createTeam",
            templateUrl:"./modules/team/new-team.html",
            controller:"newTeamController",
            data:{
                nav:"team"
            }
        })
        .state("nav.team-detail", {
            url: "/tdetail",
            templateUrl:"./modules/team/team-detail.html",
            controller: "teamDetailController",
            data:{
                nav:"team"
            }
        })
        .state("nav.coach", {
            url: "/coach",
            templateUrl: "./modules/coach/coach.html",
            controller: "coachController",
            data:{
                title:"教练 全方位的指导我们组队、敏捷项目管理与开发",
                nav:"coach"
            }
        })
        .state("nav.player", {
            url: "/player",
            templateUrl: "./modules/player/player.html",
            controller: "playerController",
            data:{
                title:"创意  让世界变得更美好",
                nav:"player"
            }
        })
        .state("nav.asset", {
            url: "/asset",
            templateUrl: "./modules/asset/asset.html",
            controller: "assetController",
            data:{
                title:"可重用资产 站在巨人的肩膀上",
                nav:"asset"
            }
        })
        .state("nav.message", {
            url: "/message",
            templateUrl: "./modules/message/message.html",
            controller: "messageController",
            data:{
                nav:"message"
            }
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
