/**
 * Created by brillwill on 16/9/14.
 */
app.controller("assetController", ["$scope", "$rootScope", "httpHelper", "util", "toaster", "ossFileService",
    function($scope, $rootScope, httpHelper, util, toaster, ossFileService){
    $scope.items = [];
    $scope.isError = false;
    $scope.isDatePickerOpen = false;
    $scope.dt = new Date();
    $scope.selectedUser = null;
    $scope.file = null;

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
        }, function cancel() {
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

    $scope.updateSelectedUser = function (user) {
        $scope.selectedUser = user;
    }

    $scope.updateSelectedIdea = function (idea) {
        $scope.selectedIdea = idea;
    }

    $scope.updateSelectedProject = function (project){
        $scope.selectedProject = project;
    }

    $scope.updateSelectedTeam = function (team) {
        $scope.selectedTeam = team;
    }

    $scope.handleUpload = function () {
        var file = document.getElementById("uploadTestId").files[0];
        var gFilename = util.globalNameForFile(file.name, $rootScope.currentUser);
        ossFileService.uploadFile(gFilename,file).then(function (data) {
            console.log("upload data = " + data.url);
        }, function fail(error){
            console.log("upload fail data = " + error);
        });

   }

}]);