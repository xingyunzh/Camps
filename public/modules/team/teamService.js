/**
 * Created by brillwill on 16/10/6.
 */
app.service("teamService", ["util", "$q", function (util, $q) {
    this.teamSource = function () {
        return util.promiseWithResolve(teamData);
    }
}]);