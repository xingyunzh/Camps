/**
 * Created by brillwill on 16/10/4.
 */
app.controller("projectDetailController", ["$scope", "$rootScope", "util", "teamService", "projectService","toaster", "$filter",
    function ($scope, $rootScope, util, teamService, projectService, toaster, $filter) {
        $scope.isNameEditing = false;
        $scope.form = makeFormOftheProject();
        $scope.list = ["one", "two", "three", "four", "five", "six"];
        $scope.isBacklogEditing = false;
        $scope.fileToUpload = null;
        $scope.isAttachmentsEditing = false;

        $scope.sampleAttachments = [
            "http://campro.oss-cn-shanghai.aliyuncs.com/u5825aeb15f490a225690a3a0_Bitmaphead.jpg",
            "http://campro.oss-cn-shanghai.aliyuncs.com/g_IMG_1466.PNG",
            "http://campro.oss-cn-shanghai.aliyuncs.com/u5825aeb15f490a225690a3a0_bike.png"
        ];

        $scope.sortableOptions = {
            update: function(e, ui) {
                // console.log("Update:" + JSON.stringify($scope.list));
                if (!$scope.isBacklogEditing){
                    ui.item.sortable.cancel();
                }
            },
            stop: function(e, ui) {
                // this callback has the changed model
                // console.log("Stop:" + JSON.stringify($scope.list));
            }
        };

        $rootScope.theTeam = null;

        (function(){
            teamService.getTeamAsLead($rootScope.theProject.manager).then(function(data){
                $rootScope.theTeam = data.team[0];
            });
            
            projectService.getBacklogByProject($rootScope.theProject).then(function(data){
                $scope.backlog = data.backlog;
            });


        })();

        $scope.onBacklogEdit= function(){
            if($scope.isBacklogEditing){
                var backlog = angular.copy($scope.backlog);
                _.map(backlog, function(item){
                    if (item.deleted){
                        delete item.as;
                        delete item.want;
                        delete item.soThat;
                    }
                });

                projectService.updateBacklogByProject($rootScope.theProject, backlog).then(function(data){
                    $scope.backlog = data.backlog;
                    toaster.pop({
                        type:"success",
                        title:"编辑Backlog",
                        body:"Backlog保存成功!",
                        timeout:500
                    });

                    $scope.isBacklogEditing = false;
                }).catch(function (error) {
                    toaster.pop({
                        type:"error",
                        title:"编辑Backlog",
                        body:"Backlog保存失败,请稍后再试!",
                        timeout:500
                    });
                });
            } else {
                $scope.isBacklogEditing = true;
            }
        }

        $scope.onAddOrUpdateStory = function(us){
            var content = !us ? {} : us;
            util.modalUserStoryInputStep(!us ? "新建UserStory" : "US-"+us._id, content).then(function(userStory){
                if (!!us){
                    us = angular.copy(userStory);
                }
                else {
                    $scope.backlog.push(userStory);
                }
            });
        }

        $scope.onRemoveStory = function(us){
            util.confirmationStep("删除", "是否确认删除UserStory:\""+ $filter("nameOfStory")(us) + '"').then(function(){
                if(!!us._id){
                    us.deleted = true;
                }
                else {
                    _.remove($scope.backlog, function(obj){
                        return obj == us;
                    });
                }
            });
        }

        $scope.onSprintEdit = function(){
            $scope.isSprintEditing = true;
        }

        $scope.onAddOrUpdateSprint = function (task) {

        }

        $scope.onRemoveSprint = function () {

        }

        $scope.onTaskEdit = function(){
            $scope.isTaskEditing = true;
        }
        
        $scope.onAddOrUpdateTask = function (task) {
            
        }
        
        $scope.onRemoveTask = function () {

        }
        
        $scope.onDataEdit = function(keys, keyEditing){
            if ($scope[keyEditing]) {
                var param = {};
                for (var i = 0; i < keys.length; i++){
                    param[keys[i]] = $scope.form[keys[i]];
                }

                projectService.update($rootScope.theProject, param).then(function(data){
                    $rootScope.theProject = data.project;

                    $scope[keyEditing] = false;
                }).catch(function(error){
                    toaster.pop({
                        type:"error",
                        title:"修改",
                        body:"系统错误,请稍后再试!",
                        timeout:500
                    });
                });
            }
            else {
                $scope[keyEditing] = true;
            }
        };

        $scope.handleIdeaLink = function () {
            $rootScope.theIdea = $scope.theProject.relatedIdea;
            $rootScope.$state.go("nav.idea-detail");
        };

        $scope.handleTeamLink = function () {
            $rootScope.$state.go("nav.team-detail")
        };

        $scope.handleStoryOrSprints = function($event){
            var coord = angular.element($event.target).offset();
            var panelCoord = angular.element(".camps-project-d-task-panel:first").offset();
            panelCoord.top = coord.top;
            angular.element(".camps-project-d-task-panel:first").offset(panelCoord);
        }

        $scope.allowEditProject = function(){
            if (!$rootScope.currentUser){
                return false;
            }

            if ($rootScope.currentUser._id == $rootScope.theProject.manager._id){
                return true;
            }
            else {
                return false;
            }
        }

        $scope.allowEditTasks = function(){
            if (!$rootScope.currentUser){
                return false;
            }

            if($scope.allowEditProject()) {
                return true;
            }

            for (var i = 0; i < $rootScope.theTeam.member.length; i++){
                if ($rootScope.theTeam.member[i]._id == $rootScope.currentUser._id){
                    return true;
                }
            }

            return false;
        }

        $scope.uploadFile = function (file) {
            $scope.fileToUpload = file.name;

        }

        $scope.nameFromAttachment = function(attachment){
            var components = attachment.split('/');
            return util.rawNameFromGlobalName(components[components.length - 1]);
        }

        function makeFormOftheProject() {
            return {
                name: $rootScope.theProject.name,
                scope: $rootScope.theProject.scope,

                backlog: angular.copy($rootScope.theProject.backlog),
                sprints: angular.copy($rootScope.theProject.sprints),
                tasks: angular.copy($rootScope.theProject.tasks)
            }
        }

    }]);