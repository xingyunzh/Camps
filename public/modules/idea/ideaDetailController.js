/**
 * Created by brillwill on 16/9/27.
 */
app.controller("ideaDetailController", ["$scope", "$rootScope", "util", function($scope, $rootScope, util){
    $scope.isEditing = false;
    $scope.form = makeFormOfTheIdea();

    $scope.onEditButton = function () {
        if ($scope.isEditing){
            util.confirmationStep("提交修改", "是否保存并提交您的修改?")
                .then(function ok() {
                    $scope.isEditing = false;
                }, function cancel() {

                });
        }
        else {
            $scope.isEditing = true;
        }
    }

    $scope.onCancelButton = function () {
        $scope.form = makeFormOfTheIdea();
        $scope.isEditing = false;
    }


    function makeFormOfTheIdea() {
        return {
            name:$rootScope.theIdea.name,
            background:$rootScope.theIdea.background,
            innovator:angular.copy($rootScope.theIdea.innovator),
            deadline:$rootScope.theIdea.deadline,
            painpoint:$rootScope.theIdea.painpoint,
            solution:$rootScope.theIdea.solution,
            hrRequirement:$rootScope.theIdea.hrRequirement,
            consultant:angular.copy($rootScope.theIdea.consultant)
        }
    }
}]);
