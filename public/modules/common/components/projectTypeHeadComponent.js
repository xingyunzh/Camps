/**
 * Created by brillwill on 16/10/6.
 */
app.component('projectTypehead', {
    templateUrl: "./modules/common/components/project-type-head-input.html",
    bindings: {
        whichRole: "=",
        notifySelected:"&onSelected"
    },
    controller: function($scope, $element, $attrs, projectService){
        $scope.getProjects = function (viewValue) {
            return projectService.projectSource();
        };

        $scope.selectedProject = null;

        $scope.handleSelected = function ($item, $model, $label, $event) {
            // $scope.$ctrl.notifySelected({user:$model});
        }

        $scope.handleAddButton = function () {
            if ($scope.selectedProject != null && typeof $scope.selectedProject != 'string') {
                $scope.$ctrl.notifySelected({project:angular.copy($scope.selectedProject)});
                $scope.selectedProject = null;
            }
        }
    }
});
