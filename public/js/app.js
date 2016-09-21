/**
 * Created by brillwill on 16/9/14.
 */
var app = angular.module("app", ["ui.router", "ui.bootstrap", "toaster", "ngAnimate"])
.run(["$rootScope", "$state", "$stateParams", function($rootScope, $state, $stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.back = function () {
        /* body... */
        $window.history.back();
    }

    console.log("run called!")
}]);