/**
 * Created by brillwill on 16/9/14.
 */
var app = angular.module("app", ["ui.router", "ui.bootstrap", "toaster", "ngAnimate"])
.run(["$rootScope", "$state", "$stateParams", function($rootScope, $state, $stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.gOptions = {
        datePicker: {
            formatYear: 'yy',
            maxDate: new Date(2020, 12, 31),
            minDate: new Date(1940,1,1),
            startingDay: 1
        }
    }

    $rootScope.back = function () {
        /* body... */
        $window.history.back();
    }

    console.log("run called!")
}]);