/**
 * Created by brillwill on 16/9/27.
 */
app.controller("ideaDetailController", ["$scope", "$rootScope", "util", "ideaService", "toaster", "ossFileService",
    function($scope, $rootScope, util, ideaService, toaster, ossFileService){
    $scope.isEditing = false;
    // $scope.targetEditable = null;
    $scope.form = makeFormOfTheIdea();
    $scope.summerOption = {
        height: 200,
        focus: false,
        airMode: false,
        toolbar: [
            ['edit',['undo','redo']],
            ['headline', ['style']],
            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
            ['fontface', ['fontname']],
            ['textsize', ['fontsize']],
            ['fontclr', ['color']],
            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link','picture']],
            ['view', ['fullscreen', 'codeview']]
        ]
    };


    $scope.onEditButton = function () {
        if ($scope.isEditing){
            util.confirmationStep("提交修改", "是否保存并提交您的修改?")
                .then(function(){
                    $scope.isEditing = false;
                    var updateContent = makeUpdateContent();
                    return ideaService.updateIdeaById($rootScope.theIdea._id, updateContent);
                }).then(function(data){
                $rootScope.theIdea = data.idea;
                $scope.form = makeFormOfTheIdea();
            }).catch(function(error){
                toaster.pop({
                    type:"error",
                    title:"错误",
                    body:error
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
    }

    $scope.imageUpload = function(files,editor){
        var file = files[0];
        if (file == null){
            return;
        }

        var targetEditable = null;
        if (editor == $scope.editorB){
            targetEditable = $scope.editableB;
        }
        else if (editor == $scope.editorP){
            targetEditable = $scope.editableP;
        }
        else {
            targetEditable = $scope.editableS;
        }

        var location = null;
        var gFilename = util.globalNameForFile(file.name, $rootScope.currentUser);
        ossFileService.uploadFile(gFilename, file, function (p) {
            console.log("file progress " + p * 100 + "%");
        }).then(function (data) {
            console.log("upload data = " + data.url);
            location = data.url;
            editor.insertImage(targetEditable,location, gFilename);

        }, function fail(error){
            console.log("upload fail data = " + error);
        });

    }


    function makeFormOfTheIdea() {
        return {
            name:$rootScope.theIdea.name,
            background:$rootScope.theIdea.background,
            innovator:angular.copy($rootScope.theIdea.innovator),
            deadline:new Date($rootScope.theIdea.deadline),
            painpoint:$rootScope.theIdea.painpoint,
            solution:$rootScope.theIdea.solution,
            hrRequirement:$rootScope.theIdea.hrRequirement,
            consultant:angular.copy($rootScope.theIdea.consultant)
        }
    }

    function makeUpdateContent(){
        var content = angular.copy($scope.form);
        var toDelete = [];
        for(var key in content){
            if (key == "deadline" && JSON.stringify(content[key]) == $rootScope.theIdea.deadline){
                toDelete.push(key);
                continue;
            }

            if ((key == 'innovator' || key == "consultant")
                && (content[key] == null || content[key]._id == $rootScope.theIdea[key]._id)){
                toDelete.push(key);
                continue;
            }

            if (content[key] == $rootScope.theIdea[key]){
                toDelete.push(key);
            }
        }

        _.forEach(toDelete, function(value){
            delete content[value];
        });

        return content;
    }
}]);
