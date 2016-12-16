/**
 * Created by brillwill on 16/9/23.
 */
app.controller("newIdeaController", ["$scope", "$rootScope", "util", "ideaService", "toaster",
    function($scope, $rootScope, util, ideaService, toaster) {
    $scope.form = {};
    $scope.sectorValues = ["互联网+","物联网","大数据","高精尖"];
    
    $scope.onSaveButton = function () {
        if(!$scope.form.name){
            toaster.pop({
                type:"info",
                title:"错误",
                body:"名字不能为空",
                timeout:3000
            });

            return;
        }
        
        ideaService.addIdea($scope.form).then(function(data){
            toaster.pop({
                type:"success",
                title:"保存",
                body:"创意保存成功",
                timeout:3000
            });
            $rootScope.theIdea = data.idea;
        }).catch(function(error){
            toaster.pop({
                type:"error",
                title:"系统错误",
                body:error,
                timeout:3000
            });
        });
    }
    
    $scope.onSubmitButton = function () {
        if(!$scope.form.name){
            toaster.pop({
                type:"info",
                title:"错误",
                body:"名字不能为空",
                timeout:3000
            });

            return;
        }

        util.confirmationStep("新建创意", "是否提交您的创意到后台审核?").then(function ok(){
            return ideaService.submitIdea("new", $scope.form);
        }).then(function(data){
            toaster.pop({
                type:"success",
                title:"提交",
                body:"创意提交成功,等待审核",
                timeout:3000
            });
            $rootScope.theIdea = data.idea;
            $rootScope.$state.go('nav.idea-detail',{ideaId:data.idea._id});
        }).catch(function(error){
            if (error != "cancel"){
                toaster.pop({
                    type:"error",
                    title:"系统错误",
                    body:error,
                    timeout:3000
                });
            }
        })
    }
}]);
