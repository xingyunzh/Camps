/**
 * Created by admin on 31/07/17.
 */
app.controller("quizController", ["$scope", "$rootScope", "$stateParams",
    function ($scope, $rootScope, $stateParams) {
        $scope.sentences = JSON.parse($stateParams.sentences);
        $scope.message = "Your result is ";

        $scope.results = Array($scope.sentences.length)

        $scope.writeDownResult = function (index, result) {
            if (index < $scope.results.length) {
                $scope.results[index] = result
            }
        };

        $scope.submit = function() {
            var count = 0;
            $scope.results.forEach(function(item, index){
                if (item != null && item == $scope.sentences[index].truth) {
                    count++;
                }
            });

            $scope.message += "" + count + "/" + $scope.sentences.length
        };

    }]);