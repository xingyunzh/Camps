/**
 * Created by brillwill on 16/10/4.
 */
app.controller("newProjectController", ["$scope", "$rootScope", "util", function ($scope, $rootScope, util) {
    $scope.form = {};

    $scope.onSubmitButton = function(){
        util.confirmationStep("新建","你团队在同一时刻只能开始一个项目,是否确认自己新建一个项目?")
            .then(function ok() {
                $rootScope.theProject = $scope.form;

                $rootScope.$state.go("nav.project-detail");
            }, function cancel() {

            })
    }
}]);