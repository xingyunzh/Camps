/**
 * Created by brillwill on 16/10/6.
 */
app.component('teamTypehead', {
    templateUrl: "./modules/common/components/team-type-head-input.html",
    bindings: {
        glyphiconClass:"=",
        whichRole: "=",
        notifySelected:"&onSelected",
        maxWidth:"<"
    },
    controller: function($scope, $element, $attrs, $q, teamService){
        $scope.getTeams = function (viewValue) {
            return teamService.teamSource(viewValue);
        };

        $scope.selectedTeam = null;
        $scope.iconClass = $attrs.glyphiconClass == null ? "glyphicon glyphicon-plus" : "glyphicon " + $attrs.glyphiconClass;

        $scope.handleSelected = function ($item, $model, $label, $event) {
            // $scope.$ctrl.notifySelected({user:$model});
        }

        $scope.handleAddButton = function () {
            if ($scope.selectedTeam != null && typeof $scope.selectedTeam != 'string') {
                $scope.$ctrl.notifySelected({team:angular.copy($scope.selectedTeam)});
                $scope.selectedTeam = null;
            }
        }
    }
});
