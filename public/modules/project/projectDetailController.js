/**
 * Created by brillwill on 16/10/4.
 */
app.controller("projectDetailController",
    ["$scope", "$rootScope", "$stateParams", "util", "teamService", "projectService","toaster", "$filter",
        "$q", "ossFileService", "$timeout",
    function ($scope, $rootScope,$stateParams, util, teamService, projectService, toaster, $filter,
              $q, ossFileService, $timeout) {
        $scope.isNameEditing = false;
        $scope.form = {};
        $scope.list = ["one", "two", "three", "four", "five", "six"];
        $scope.isBacklogEditing = false;
        $scope.fileToUpload = null;
        $scope.isAttachmentsEditing = false;
        $scope.percentage = 0;
        $scope.theUserStory = null;

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
            var updateProjectIfNeeds = null;
            if ($rootScope.theProject && $rootScope.theProject._id == $stateParams.projectId) {
                updateProjectIfNeeds = util.promiseWithResolve($rootScope.theProject);
            }
            else if ($stateParams.projectId){
                updateProjectIfNeeds = projectService.getProjectById($stateParams.projectId).then(function(data){
                  return data.project;
                });
            }
            else {
                return;
            }

            updateProjectIfNeeds.then(function(project){
                $rootScope.theProject = project;
                $scope.form = makeFormOfTheProject();
                $rootScope.theTeam = project.team;

                return $q.all([projectService.getBacklogByProject(project), projectService.getSprintsByProject(project)]);
            }).then(function(dataGroup){
                $scope.backlog = dataGroup[0].backlog;
                $scope.sprints = dataGroup[1].sprints;
            }).catch(function(error){
                toaster.pop({
                    type:"error",
                    title:"系统错误",
                    body:JSON.stringify(error),
                    timeout:500
                });
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
        };

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
        };

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
        };

        $scope.onSprintEdit = function(){
            $scope.isSprintEditing = true;
        };

        $scope.onAddOrUpdateSprint = function (task) {

        };

        $scope.onRemoveSprint = function () {

        };

        $scope.onTaskEdit = function(){
            $scope.isTaskEditing = true;
        };
        
        $scope.onAddOrUpdateTask = function (task) {
            
        };
        
        $scope.onRemoveTask = function () {

        };
        
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
                        body:"系统错误,请稍后再试!" + JSON.stringify(error),
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
            $rootScope.$state.go("nav.idea-detail",{ideaId:$rootScope.theIdea._id});
        };

        $scope.handleTeamLink = function () {
            $rootScope.$state.go("nav.team-detail", {teamId:$rootScope.theTeam._id});
        };

        $scope.handleStory = function(story, $event){
            $scope.theUserStory = story;

            $timeout(function(){
                var coord = angular.element($event.delegateTarget).offset();
                console.log("click " + $event.delegateTarget.localName);
                var panelCoord = angular.element(".camps-project-d-task-panel:first").offset();
                panelCoord.top = coord.top + 10;
                angular.element(".camps-project-d-task-panel:first").offset(panelCoord);
            });
        };

        $scope.allowEditProject = function(){
            if (!$rootScope.currentUser || !$rootScope.theProject){
                return false;
            }

            if ($rootScope.currentUser._id == $rootScope.theProject.manager._id){
                return true;
            }
            else {
                return false;
            }
        };

        $scope.allowEditTasks = function(){
            if (!$rootScope.currentUser || !$rootScope.theTeam){
                return false;
            }

            if($scope.allowEditProject()) {
                return true;s
            }

            for (var i = 0; i < $rootScope.theTeam.members.length; i++){
                if ($rootScope.theTeam.members[i]._id == $rootScope.currentUser._id){
                    return true;
                }
            }

            return false;
        };

        $scope.uploadFile = function (file) {
            if (!file){
                return;
            }

            $scope.fileToUpload = file.name;

            var gFileName = util.globalNameForFile(file.name, $rootScope.currentUser);

            ossFileService.getClient().then(function(client){
                return ossFileService.uploadFileWithClient(client,gFileName,file,function(p){
                    $scope.$apply(function(scope){
                        scope.percentage = p;
                    });
                    console.log(p);
                });
            }).then(function(res){
                $scope.form.attachments.push(res.url);
                // $scope.sampleAttachments.push(res.url);
                $scope.fileToUpload = null;
                $scope.percentage = 0;
            }).catch(function(error){
                toaster.pop({
                    type:"error",
                    title:"修改",
                    body:"系统错误,请稍后再试!" + JSON.stringify(error),
                    timeout:500
                });
            });
        };

        $scope.nameFromAttachment = function(attachment){
            var components = attachment.split('/');
            return util.rawNameFromGlobalName(components[components.length - 1]);
        };

        function makeFormOfTheProject() {
            return {
                name: $rootScope.theProject.name,
                scope: $rootScope.theProject.scope,

                backlog: angular.copy($rootScope.theProject.backlog),
                sprints: angular.copy($rootScope.theProject.sprints),
                tasks: angular.copy($rootScope.theProject.tasks),
                attachments:$rootScope.theProject.attachments ? angular.copy($rootScope.theProject.attachments) : []
            }
        }

    }]);