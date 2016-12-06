/**
 * Created by brillwill on 16/10/6.
 */
app.service("teamService", ["httpHelper", "$q", function (httpHelper, $q) {
    this.teamSource = function () {
        return httpHelper.sendRequest("GET", "./api/team/list");
    }

    this.add = function(param) {
        return httpHelper.sendRequest("POST", "./api/team/add", param);
    }
}]);