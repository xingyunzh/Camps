/**
 * Created by brillwill on 16/10/5.
 */
app.service("ideaService", ["util", "$q", function (util, $q) {
    this.ideaSource = function () {
        return util.promiseWithResolve(ideaData);
    }

    this.getIdeaById = function (id) {
        var idea = null;
        _.forEach(ideaData,function(item){
            item.id == id;
            idea = item;
        });

        return util.promiseWithResolve(idea);
    }
}]);