/**
 * Created by brillwill on 16/9/14.
 */
app.controller("messageController", ["$scope", "$rootScope", "httpHelper",
    function($scope, $rootScope, httpHelper) {
        $scope.sendMessage = function() {
            httpHelper.sendRequest("POST", "./message/sending", {
                from: "admin",
                to: "morris.liu",
                msgTitle: "Hello",
                msgContent: "Welcome to our site"
            }).then(function success(data) {
                console.log(data);
            }, function fail() {
                console.log("FAIL");
            });
        }

        $scope.getMessage = function() {
            httpHelper.sendRequest("POST", "./message/getting", {
                user: "morris.liu",
                selection: "all"
            }).then(function success(data) {
                $scope.msgs = data;
            }, function fail() {
                $scope.msgs = [];
            });
        }
    }
]);
