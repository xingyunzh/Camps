/**
 * Created by brillwill on 16/9/27.
 */
app.controller("ideaDetailController", ["$scope", "$rootScope", "$stateParams", "util", "ideaService", "toaster", "projectService",
    function ($scope, $rootScope, $stateParams, util, ideaService, toaster, projectService) {

        $scope.isEditing = false;
        $scope.form = {};
        $scope.summerOption = {
            height: 200,
            focus: false,
            airMode: false,
            toolbar: [
                ['edit', ['undo', 'redo']],
                ['headline', ['style']],
                ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                ['fontface', ['fontname']],
                ['textsize', ['fontsize']],
                ['fontclr', ['color']],
                ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                ['height', ['height']],
                ['table', ['table']],
                ['insert', ['link', 'picture']],
                ['view', ['fullscreen', 'codeview']]
            ]
        };

        (function initialize(){
            var updateTheIdeaIfNeeds = null;
            if (!$rootScope.theIdea || ($stateParams.ideaId && $rootScope.theIdea._id != $stateParams.ideaId)){
                updateTheIdeaIfNeeds = ideaService.getIdeaById($stateParams.ideaId);
            }
            else {
                updateTheIdeaIfNeeds = util.promiseWithResolve($rootScope.theIdea);
            }

            updateTheIdeaIfNeeds.then(function(idea){
                $rootScope.theIdea = idea;
                $scope.form = makeFormOfTheIdea();

                return projectService.getProjectsByIdea(idea._id);
            }).then(function(data){
                $rootScope.theIdea.projects = data.projects;
            }).catch(function(error){
                toaster.pop({
                    type:"error",
                    title:"系统错误",
                    body:JSON.stringify(error),
                    timeout:500
                });
            });

        })();


        $scope.onEditButton = function () {
            if ($scope.isEditing) {
                util.confirmationStep("提交修改", "是否保存并提交您的修改?")
                    .then(function () {
                        $scope.isEditing = false;
                        var updateContent = makeUpdateContent();
                        return ideaService.updateIdeaById($rootScope.theIdea._id, updateContent);
                    }).then(function (idea) {
                    $rootScope.theIdea = idea;
                    $scope.form = makeFormOfTheIdea();
                }).catch(function (error) {
                    toaster.pop({
                        type: "error",
                        title: "错误",
                        body: error
                    });
                });
            }
            else {
                $scope.isEditing = true;
            }
        }

        $scope.onCancelButton = function () {
            $scope.form = makeFormOfTheIdea();
            $scope.isEditing = false;
        };

        $scope.onImagesPicked = function (images) {
            $scope.form.headImgUrl = images[0].url;
        };

        $scope.onRemoveHeadImage = function(){
            $scope.form.headImgUrl = null;
        };

        $scope.handleProjectLink = function (prj) {
            projectService.getProjectById(prj._id).then(function ok(project) {
                $rootScope.theProject = project;
                $rootScope.$state.go("nav.project-detail", {projectId:project._id});
            }, function fail() {
                util.confirmationStep("错误", "项目不存在");
            });
        }

        function makeFormOfTheIdea() {
            return {
                name: $rootScope.theIdea.name,
                background: $rootScope.theIdea.background,
                innovator: angular.copy($rootScope.theIdea.innovator),
                deadline: new Date($rootScope.theIdea.deadline),
                painpoint: $rootScope.theIdea.painpoint,
                solution: $rootScope.theIdea.solution,
                hrRequirement: $rootScope.theIdea.hrRequirement,
                consultant: angular.copy($rootScope.theIdea.consultant),
                headImgUrl:$rootScope.theIdea.headImgUrl
            }
        }

        function makeUpdateContent() {
            var content = angular.copy($scope.form);
            var toDelete = [];
            for (var key in content) {
                if (key == "deadline" && JSON.stringify(content[key]) == $rootScope.theIdea.deadline) {
                    toDelete.push(key);
                    continue;
                }

                if ((key == 'innovator' || key == "consultant")
                    && (content[key] == null || content[key]._id == $rootScope.theIdea[key]._id)) {
                    toDelete.push(key);
                    continue;
                }

                if (content[key] == $rootScope.theIdea[key]) {
                    toDelete.push(key);
                }
            }

            _.forEach(toDelete, function (value) {
                delete content[value];
            });

            return content;
        }
    }]);
