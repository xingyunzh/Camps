/**
 * Created by brillwill on 16/10/1.
 */
app.component('userTypehead', {
    templateUrl: "./modules/common/components/user-type-head-input.html",
    bindings: {
        glyphiconClass:"<",
        whichRole: "=",
        notifySelected:"&onSelected",
        maxWidth:"<",
        candidates:"="
    },
    controller: function($scope, $element, $attrs, util, playerService, coachService){
        $scope.getUsers = function (viewValue) {
            if(this.$ctrl.candidates){
                // return util.promiseWithResolve(_.filter(this.$ctrl.candidates, function(item){
                //     return item.nickname.search(viewValue) != -1;
                // }));

                return util.promiseWithResolve(this.$ctrl.candidates);
            }

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
