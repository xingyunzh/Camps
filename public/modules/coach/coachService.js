/**
 * Created by brillwill on 16/10/1.
 */
app.service("coachService", ['httpHelper', 'util', '$q', function (httpHelper, util,$q) {
    this.coachSource = function () {
        return util.promiseWithResolve(_.filter(userData, function (item) {
            return _.includes(item.roles, "coach");
        }));
    };
}]);