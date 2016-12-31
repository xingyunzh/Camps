//button-label optional 按钮标签 例子：'选择图片' 默认：‘添加图片
//multiple optional 是否是多选模式 Boolean 默认：false
//type optional defaultImage的类型 user/idea/team/project/other  默认：'other'
//onFinished required 回调函数，参数为 [{name:String,url:String}]

app.component('imagePicker', {
    templateUrl: "./modules/common/components/image-picker.html",
    bindings: {
        buttonLabel:'@',
        multiple:'<',
        type:'<',
        onFinished:'&'
    },
    controller: function($scope,$rootScope, $element, $attrs,ossFileService,$q,defaultImageService,toaster,util){
        
        init();
        dataInit();
        getImages();

        function init(){
            $scope.buttonValue = '添加图片';
            if (!!$attrs.buttonLabel) {
                $scope.buttonValue = $attrs.buttonLabel;
            }

            $scope.multiple = false;
            if (!!$attrs.multiple) {
                $scope.multiple = $attrs.multiple;
            }
            $scope.defaultImages = [];
            $scope.OSSClient = null;
            $scope.popoverIsOpen = false;
            $scope.panelUrl = './modules/common/components/image-panel.html';
        }

        function dataInit(){
            $scope.selectedImages = [];
            $scope.uploadImages = [];
        }

        function getClient(){
            var deferred = $q.defer();

            if (!!$scope.OSSClient) {
                deferred.resolve($scope.OSSClient);
            }else{
                ossFileService.getClient().then(function(client){
                    $scope.OSSClient = client;
                    deferred.resolve(client);
                }).catch(function(err){
                    deferred.reject(err);
                });
            }

            return deferred.promise;
        }

        function getImages(){
            var type = 'other';
            if (!!$attrs.type) {
                type = $attrs.type;
            }

            defaultImageService.getImagesByType(type).then(function(data){
                $scope.defaultImages = data.images;
            }).catch(function(err){
                toaster.pop({
                    type:"error",
                    title:"系统错误",
                    body:err,
                    timeout:3000
                });
            });
        }

        $scope.uploadImage = function(file){
            if (!file) {
                return;
            }

            var gFilename = util.globalNameForFile(file.name, $rootScope.currentUser);

            var image = {
                percentage : 0,
                name : gFilename
            };

            $scope.uploadImages.push(image);

            //var index = $scope.uploadImages.length - 1;
            getClient().then(function(client){
                return ossFileService.uploadFileWithClient(client,gFilename,file,function(p){
                    $scope.$apply(function(scope){
                        image.percentage = p;
                    });
                    console.log(p);
                });
            }).then(function(res){
                image.url = res.url;  
                checkImage(image);
            }).catch(function(err){
                console.log('ERROR',err);
            });

        };

        $scope.deleteImage = function(image){
            $scope.uploadImages.splice(image,1);

            // getClient().then(function(client){
            //     return ossFileService.deleteFileWithClient(client,name);
            // }).then(function(res){
            //     console.log(err);
            // }).catch(function(err){
            //     console.log('ERROR',err);
            // });
        };

        $scope.submit = function(){
            $scope.$ctrl.onFinished({images:$scope.selectedImages});
            dataInit();
            $scope.popoverIsOpen = false;
        };

        $scope.cancel = function(){
            dataInit();
            $scope.popoverIsOpen = false;
        };

        function checkImage(image){
            if ($scope.multiple) {
                $scope.selectedImages.push(image);
            }else{
                $scope.selectedImages = [image];
            }
        }

        $scope.onImageClick = function(image){
            var i = $scope.selectedImages.indexOf(image);

            if (i > -1) {
                $scope.selectedImages.splice(i,1);
            }else{
                checkImage(image);
            }
        };
    }
});