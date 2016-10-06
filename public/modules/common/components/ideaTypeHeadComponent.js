/**
 * Created by brillwill on 16/10/5.
 */
app.component('ideaTypehead', {
    templateUrl: "./modules/common/components/idea-type-head-input.html",
    bindings: {
        whichRole: "=",
        notifySelected:"&onSelected"
    },
    controller: function($scope, $element, $attrs, ideaService){
        $scope.getIdeas = function (viewValue) {
            return ideaService.ideaSource();
        };

        $scope.selectedIdea = null;

        $scope.handleSelected = function ($item, $model, $label, $event) {
            // $scope.$ctrl.notifySelected({user:$model});
        }

        $scope.handleAddButton = function () {
            if ($scope.selectedIdea != null && typeof $scope.selectedIdea != 'string') {
                $scope.$ctrl.notifySelected({idea:angular.copy($scope.selectedIdea)});
                $scope.selectedIdea = null;
            }
        }
    }
});
