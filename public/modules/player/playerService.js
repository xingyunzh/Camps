/**
 * Created by brillwill on 16/10/1.
 */
app.service("playerService", ['httpHelper', 'util', '$q', function (httpHelper, util,$q) {
    this.playerSource = function (keyword) {
        return httpHelper.sendRequest('POST', './api/user/list', {
            role:"Player",
            keyword:keyword
        }).then(function(data){
            return data.users.list;
        });
    };
}]);