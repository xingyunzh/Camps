/**
 * Created by admin on 06/04/17.
 */

app.controller("meetingController", ["$scope", "$rootScope","$stateParams", "conversationPlayer", "$http",
    function ($scope, $rootScope, $stateParams, conversationPlayer,$http) {
        $rootScope.navBar.title = "初次拜访";
        $scope.id = $stateParams.meetingId;
        $scope.player = conversationPlayer;

        $scope.reset = function(){
            $scope.text = "Ready";
            $scope.items = null;
            $scope.candidatePeople = null;
            $scope.player.reset();

            var path = location.pathname;
            var dataPath = "data/meeting-albert.json";
            var indexOfIndexHMTL = path.indexOf("index.html")
            if (indexOfIndexHMTL > 0) {
                path = path.slice(0,indexOfIndexHMTL)
                path += dataPath
            }
            else {
                path.endsWith("/") ? path += dataPath : path += "/" + dataPath;
            }

            $http.get(path).then(function(response){
                conversationPlayer.sceneData = response.data;
                $scope.candidatePeople = response.data.people;
                $scope.text = "请选择我方参与角色";
            }).catch(function(response){
                $scope.text = "load file error:" + response.statusText;
            });
        };

        $scope.updateUI = function(ret){
            if(angular.isArray(ret)){
                $scope.items = ret;
                $scope.text = "请选择：";
            }
            else {
                $scope.items = null;
                $scope.text = ret;
            }
        }

        $scope.handleNext = function(){
            var ret = conversationPlayer.next();
            $scope.updateUI(ret);
        };

        $scope.handleChoose = function(item){
            var ret = conversationPlayer.handleChoose(item);
            $scope.updateUI(ret);
        };

        $scope.handleCandidate = function(cand){
            if(cand.required){
                return;
            }

            var index = conversationPlayer.userData.people.indexOf(cand.name);
            if(index >= 0){
                conversationPlayer.userData.people.splice(index, 1);
            }
            else {
                conversationPlayer.userData.people.push(cand.name);
            }
        };

        $scope.handleQuiz = function(){
            var json = JSON.stringify(conversationPlayer.sceneData.quiz.judge)
            $rootScope.$state.go("quiz", {sentences:json})
        };

        $scope.reset();

    }]);