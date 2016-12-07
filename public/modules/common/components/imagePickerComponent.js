app.component('imagePicker', {
    templateUrl: "./modules/common/components/image-picker.html",
    bindings: {
        buttonLabel:'=',
        res:'<',
        type:'=',
        onSelected:'&'
    },
    controller: function($scope, $element, $attrs,ossFileService,$q,defaultImageService,toaster){
        
        init();
        getImages();

        function init(){
            $scope.buttonValue = '添加图片';
            if (!!$attrs.buttonLabel) {
                $scope.buttonValue = $attrs.buttonLabel;
            }

            $scope.defaultImages = [];
            $scope.uploadImages = [];
            $scope.selectedImages = [];
            $scope.imageToUpload = null;
            $scope.OSSClient = null;
            $scope.popoverIsOpen = false;
            $scope.panelUrl = './modules/common/components/image-panel.html';

        }

        function getClient(){
            var deferred = $q.defer();

            if (!!$scope.OSSClient) {
                return deferred.resovle($scope.OSSClient);
            }else{
                $ossFileService.getClient().then(function(client){
                    $scope.OSSClient = client;
                    deferred.resovle(client);
                }).catch(function(err){
                    deferred.reject(err);
                });
            }

            return deferred.promise;
        }

        function getImages(){
            defaultImageService.getImagesByType($attrs.res).then(function(data){
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

        $scope.uploadImage = function(){
            var file = $scope.imageToUpload;

            var gFilename = util.globalNameForFile(file.name, $rootScope.currentUser);

            ossFileService.uploadFile(gFilename,$scope.imageToUpload,function(p){

            }).then(function(res){
                var image = {
                    url:'',
                };

                $scope.uploadImages.concat(image);

            }).catch(function(err){

            });
        };

        $scope.submit = function(){

        };

        $scope.cancel = function(){
            $scope.popoverIsOpen = false;
        };

        $scope.onDefaultImageClick = function(id){
            $ctrl.onSelected(id);
        };
    }
});