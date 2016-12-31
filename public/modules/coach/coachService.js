/**
 * Created by brillwill on 16/10/1.
 */
app.service("coachService", ['httpHelper', 'util', '$q', function (httpHelper, util,$q) {
    this.coachSource = function (keyword) {
        return httpHelper.sendRequest('GET', './api/user/list?role=coach&keyword='+keyword).then(function(data){
            return data.users;
        });
    };
}]);