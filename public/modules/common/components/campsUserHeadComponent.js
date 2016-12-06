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
        if (!!this.user.headImgUrl) {
            $scope.url = this.user.headImgUrl;
        }
        else {
            $scope.url = "http://campro.oss-cn-shanghai.aliyuncs.com/stars_logo.jpg";
        }
    }
});
