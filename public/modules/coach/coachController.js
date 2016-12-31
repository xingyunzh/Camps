/**
 * Created by brillwill on 16/9/14.
 */
app.controller("coachController", ["$scope", "$rootScope", function($scope, $rootScope){
    var data = [
        {
            headImgUrl:"./images/coach.png",
            name:"Eric Yan",
            type:"创意",
            sector:"文化产业，移动App创意"
        },
        {
            headImgUrl:"./images/coach.png",
            name:"William Yu",
            type:"项目",
            sector:"移动App，地图&GIS"
        },
        {
            headImgUrl:"./images/coach.png",
            name:"Ray Guo",
            type:"项目",
            sector:"移动App设计，网站设计"
        },
        {
            headImgUrl:"./images/coach.png",
            name:"Ray Zhang",
            type:"项目",
            sector:"移动App开发，网站开发"
        },
    ];

    $scope.coaches = data;
}]);