/**
 * Created by brillwill on 16/10/1.
 */
app.service("playerService", ['httpHelper', 'util', '$q', function (httpHelper, util,$q) {
    this.playerSource = function () {
        var deferred = $q.defer();
        setTimeout(function(){
            deferred.resolve(_.filter(userData, function (item) {
                return _.includes(item.roles, "player");
            }));
        }, 0);

        return deferred.promise;
    };
}]);