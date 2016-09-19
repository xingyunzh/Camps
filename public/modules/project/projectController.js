/**
 * Created by brillwill on 16/9/14.
 */
app.controller("projectController", ["$scope", "$rootScope", function($scope, $rootScope){
    var data = [
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },
        {
            title:"基于MEAN框架的会议议程助手",
            detail:"本项目是是用AngularJS, Node.js/Express, MongoDB等技术,实现会议议程助手创意的项目。项目由华中科技大学星星战队队员设计实施并交付完成。"
        },

    ];

    $scope.projects = data;

}]);