/**
 * Created by admin on 31/07/17.
 */
app.controller("quizController", ["$scope", "$rootScope", "$stateParams",
    function ($scope, $rootScope, $stateParams) {
        $scope.sentences = JSON.parse($stateParams.sentences);
        $scope.message = "";

        $scope.results = Array($scope.sentences.length).fill(false);

        $scope.submit = function() {
            var count = 0;
            $scope.results.forEach(function(item, index){
                if (item != null && item == ($scope.sentences[index].truth == 1)) {
                    count++;
                }
            });

            $scope.message = "Your result is " + count + "/" + $scope.sentences.length
        };

    }]);