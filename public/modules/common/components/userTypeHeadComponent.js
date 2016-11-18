/**
 * Created by brillwill on 16/10/1.
 */
app.component('userTypehead', {
    templateUrl: "./modules/common/components/user-type-head-input.html",
    bindings: {
        glyphiconClass:"=",
        whichRole: "=",
        notifySelected:"&onSelected"
    },
    controller: function($scope, $element, $attrs, $q, playerService, coachService){
        $scope.getUsers = function (viewValue) {
            if($attrs.whichRole == "coach") {
                return coachService.coachSource(viewValue);
            }
            return playerService.playerSource(viewValue);
        };
        
        $scope.selectedUser = null;
        $scope.iconClass = $attrs.glyphiconClass == null ? "glyphicon glyphicon-plus" : "glyphicon " + $attrs.glyphiconClass;

        $scope.handleSelected = function ($item, $model, $label, $event) {
            // $scope.$ctrl.notifySelected({user:$model});
        }

        $scope.handleAddButton = function () {
            if ($scope.selectedUser!= null && typeof $scope.selectedUser != 'string') {
                $scope.$ctrl.notifySelected({user:angular.copy($scope.selectedUser)});
                $scope.selectedUser = null;
            }
        }
    }
});
