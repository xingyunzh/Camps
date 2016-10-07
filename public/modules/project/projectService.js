/**
 * Created by brillwill on 16/10/6.
 */
app.service("projectService", ["util", "$q", function (util, $q) {
    this.projectSource = function () {
        var deferred = $q.defer();
        setTimeout(function () {
            deferred.resolve(projectData);
        }, 0);

        return deferred.promise;
    };

    this.getProjectById = function (id){
        var deferred = $q.defer();
        setTimeout(function () {
            var project = null;
            _.forEach(projectData, function (p) {
                if(p.id === id){
                    project = p;
                }
            });
            deferred.resolve(project);
        });

        return deferred.promise;
    }
}]);