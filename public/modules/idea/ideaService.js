/**
 * Created by brillwill on 16/10/5.
 */
app.service("ideaService", ["util", "$q", function (util, $q) {
    this.ideaSource = function () {
        var deferred = $q.defer();
        setTimeout(function () {
            deferred.resolve(ideaData);
        }, 0);

        return deferred.promise;
    }
}]);