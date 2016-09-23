/**
 * Created by brillwill on 16/9/14.
 */
app.controller("assetController", ["$scope", "$rootScope", "httpHelper", "util", "toaster",
    function($scope, $rootScope, httpHelper, util, toaster){
    $scope.items = [];
    $scope.isError = false;
    $scope.isDatePickerOpen = false;
    $scope.dt = new Date();

    $scope.onRefresh = function () {
        httpHelper.sendRequest("GET", "./demo").then(function success(data) {
            $scope.items = data;
            $scope.isError = false;
        },function fail(){
            $scope.isError = true;
            $scope.items = [];
        });
    }
    
    $scope.onTest = function () {
        util.confirmationStep("Test Title", "Are you ready for Campro?").then(function success() {
            $scope.result="Yes, I'm ready for Campro.";
        }, function failure(){
            $scope.result = "No, I'm not."
        })
    }

    $scope.onModalInputTest = function(){
        util.modalTextInputStep("Input your idea","Placeholder").then(function ok(data) {
            $scope.inputText = data;
        }, function cancel(data) {
            $scope.inputText = "";
        })
    }
    
    $scope.toasterPop = function () {
        toaster.pop({
            type:'info',
            title:'title',
            body:'bodyTextContent',
            // timeout:0
        });
    }
    
    $scope.toasterClear = function () {
        toaster.clear();
    }

    $scope.onClickDatePicker = function () {
        $scope.isDatePickerOpen = !$scope.isDatePickerOpen;
        console.log("dt=" + $scope.dt);
    }


}]);