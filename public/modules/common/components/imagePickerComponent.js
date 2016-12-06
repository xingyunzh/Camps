app.component('ideaTypehead', {
    templateUrl: "./modules/common/components/image-picker.html",
    bindings: {
        buttonLabel:'=',
        res:'=',
        type:'=',
        onSelected:'&'
    },
    controller: function($scope, $element, $attrs,ossFileService,$q){
        $scope.OSSClient = null;

        function getClient(){
            var deferred = $q.defer();

            if (!!$scope.OSSClient) {
                return deferred.resovle($scope.OSSClient);
            }else{
                $ossFileService.getClient().then(function(client){
                    $scope.OSSClient = client;
                    deferred.resovle(client);
                }).fail(function(err){
                    deferred.reject(err);
                });
            }

            return deferred.promise;
        }

        $scope.getImages = function(){

        };

        $scope.onImageClick = function(id){
            $ctrl.onSelected(id);
        };
    }
});