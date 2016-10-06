/**
 * Created by brillwill on 16/10/6.
 */
app.service("teamService", ["util", "$q", function (util, $q) {
    this.teamSource = function () {
        var deferred = $q.defer();
        setTimeout(function () {
            deferred.resolve(teamData);
        }, 0);

        return deferred.promise;
    }
}]);