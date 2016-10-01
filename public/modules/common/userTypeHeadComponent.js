/**
 * Created by brillwill on 16/10/1.
 */
app.component('userTypehead', {
    templateUrl: "./modules/common/user-type-head-input.html",
    bindings: {
        whichRole: "=",
        notifySelected:"&onSelected"
    },
    controller: function($scope, $element, $attrs, $q, playerService, coachService){
        $scope.getUsers = function (viewValue) {
            if($attrs.whichRole == "coach") {
                return coachService.coachSource();
            }
            return playerService.playerSource();
        };
        
        $scope.selectedUser = null;

        $scope.handleSelected = function ($item, $model, $label, $event) {
            // $scope.$ctrl.notifySelected({user:$model});
        }

        $scope.handleAddButton = function () {
            if (typeof $scope.selectedUser != 'string') {
                $scope.$ctrl.notifySelected({user:angular.copy($scope.selectedUser)});
                $scope.selectedUser = null;
            }
        }
    }
});
