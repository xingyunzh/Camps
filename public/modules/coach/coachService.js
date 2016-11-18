/**
 * Created by brillwill on 16/10/1.
 */
app.service("coachService", ['httpHelper', 'util', '$q', function (httpHelper, util,$q) {
    this.coachSource = function (keyword) {
        return httpHelper.sendRequest('POST', './api/user/list', {
            role:"Coach",
            keyword:keyword
        }).then(function(data){
            return data.users.list;
        });
    };
}]);