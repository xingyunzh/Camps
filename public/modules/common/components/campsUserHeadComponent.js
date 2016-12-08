/**
 * Created by brillwill on 16/11/30.
 */
app.component('campsUserHead', {
    templateUrl: "./modules/common/components/camps-user-head.html",
    bindings: {
        user: "=",
        width:"<",
        height:"<"
    },
    controller: function($scope, $element, $attrs){
        $scope.defaultImageSrc = "http://campro.oss-cn-shanghai.aliyuncs.com/stars_logo.jpg";
        // updateByUserValue(this.user);
        // $scope.$watch("user", updateByUserValue);
        //
        // function updateByUserValue(value){
        //     if (!!value && !!value.headImgUrl) {
        //         $scope.url = value.headImgUrl;
        //     }
        //     else {
        //         $scope.url = "http://campro.oss-cn-shanghai.aliyuncs.com/stars_logo.jpg";
        //     }
        // };


    }
});
