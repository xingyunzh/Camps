/**
 * Created by brillwill on 16/10/6.
 */
app.service("projectService", ["util", "$q", function (util, $q) {
    this.projectSource = function () {
        return util.promiseWithResolve(projectData);
    };

    this.getProjectById = function (id){
        var project = null;
        _.forEach(projectData, function (p) {
            if(p.id === id){
                project = p;
            }
        });
        return util.promiseWithResolve(project);
    }
}]);