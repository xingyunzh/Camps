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
        $scope.isManagerEditing = false;
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
                $scope.backlogReordered = true;
            }
        };

        $rootScope.theTeam = null;

        (function(){
            var updateProjectIfNeeds = null;
            if ($rootScope.theProject && $rootScope.theProject._id == $stateParams.projectId) {
                updateProjectIfNeeds = util.promiseWithResolve($rootScope.theProject);
            }
            else if ($stateParams.projectId){
                updateProjectIfNeeds = projectService.getProjectById($stateParams.projectId);
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
                $scope.backlog = dataGroup[0];
                $scope.sprints = dataGroup[1];
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

                var actions = [];
                _.map(backlog, function(item){
                    if (item.deleted && !!item._id){
                        actions.push(projectService.removeStory(item));
                    }

                    if(item.modified){
                        actions.push(projectService.updateStory(item));
                    }

                    if(!item._id) {
                        actions.push(projectService.createStoryForProject(item, $scope.theProject));
                    }
                });

                $q.all(actions).then(function(dataGroup){
                    if ($scope.backlogReordered){
                        var prioritizedBacklog = _.filter(backlog, function(item){
                            return !item.deleted;
                        }).map(function(item){
                            return item._id;
                        });
                        return projectService.updateProjectBacklogPriority($scope.theProject, prioritizedBacklog)
                            .then(function(project){
                                return projectService.getBacklogByProject(project);
                            });
                    }
                    else {
                        return projectService.getBacklogByProject($scope.theProject);
                    }
                }).then(function(backlog){
                    $scope.backlog = backlog;
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
                $scope.theUserStory = null;
            }
        };

        $scope.onAddOrUpdateStory = function(us){
            var content = !us ? {} : us;
            util.modalUserStoryInputStep(!us ? "新建UserStory" : "US-"+us._id, content).then(function(userStory){
                if (!!us){
                    us.as = userStory.as;
                    us.want = userStory.want;
                    us.soThat = userStory.soThat;

                    us.modified = true;
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
            $scope.isSprintEditing = !$scope.isSprintEditing;
        };

        $scope.onAddOrUpdateSprint = function (sprint) {
            var content = sprint ? sprint : {};
            util.modalSprintInputStep(sprint?"编辑Sprint":"新建Sprint", content, $scope.backlog).then(function(resultSprint){
                if (sprint){
                    for(var key in resultSprint){
                        sprint[key] = resultSprint[key];
                    }
                    return projectService.updateSprint(sprint);
                }
                else {
                    return projectService.createSprintInProject(resultSprint, $rootScope.theProject);
                }
            }).then(function(sp){
                var indexFound = -1;
                for(var i = 0; i < $scope.sprints.length; i++){
                    if($scope.sprints[i]._id == sp._id){
                        $scope.sprints[i] = sp;
                        indexFound = i;
                        break;
                    }
                }
                if(indexFound < 0){
                    $scope.sprints.push(sp);
                }
            });
        };

        $scope.onRemoveSprint = function (sprint) {
            util.confirmationStep("删除Sprint", "是否确定要删除Sprint "+$filter("idOfSprint")(sprint)).then(function(){
                return projectService.removeSprint(sprint);
            }).then(function(sprint){
                _.remove($rootScope.sprints, function(item){
                    return item._id == sprint._id;
                });
            });
        };

        $scope.handleSprint = function(item, $event){

        };

        $scope.onTaskEdit = function(){
            if ($scope.isTaskEditing){
                $scope.isTaskEditing = false;
            }
            else {
                $scope.isTaskEditing = true;
            }
        };
        
        $scope.onAddOrUpdateTask = function (task) {
            var content = task ? task : {};
            util.modalTaskInputStep(task?"编辑Task":"新建Task", content).then(function(resultTask){
                if (task){
                    //update
                    for(var key in resultTask){
                        task[key] = resultTask[key];
                    }
                    return projectService.updateTask(task);
                }
                else {
                    //create
                    return projectService.createTaskForStory(resultTask, $scope.theUserStory);
                }
            }).then(function(task){
                if(task){
                    var indexFound = -1;
                    for(var i = 0; i < $scope.theUserStory.tasks.length; i++){
                        if($scope.theUserStory.tasks[i]._id == task._id){
                            $scope.theUserStory.tasks[i] = task;
                            indexFound = i;
                            break;
                        }
                    }

                    if (indexFound < 0){
                        $scope.theUserStory.tasks.push(task);
                    }
                }
            });
        };
        
        $scope.onRemoveTask = function (task) {
            util.confirmationStep("删除任务", "是否确定要删除:Task "+$filter("idOfTask")(task)+"?").then(function(){
                if(task._id){
                    return projectService.removeTask(task);
                }
                else {
                    return task;
                }
            }).then(function(){
                _.remove($scope.theUserStory.tasks, function(item){
                    return item == task;
                });
            });
        };
        
        $scope.onDataEdit = function(keys, keyEditing){
            if ($scope[keyEditing]) {
                var param = {};
                for (var i = 0; i < keys.length; i++){
                    param[keys[i]] = $scope.form[keys[i]];
                }

                projectService.update($rootScope.theProject, param).then(function(project){
                    $rootScope.theProject = project;

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

                manager:angular.copy($rootScope.theProject.manager),
                backlog: angular.copy($rootScope.theProject.backlog),
                sprints: angular.copy($rootScope.theProject.sprints),
                tasks: angular.copy($rootScope.theProject.tasks),
                attachments:$rootScope.theProject.attachments ? angular.copy($rootScope.theProject.attachments) : []
            }
        }

    }]);