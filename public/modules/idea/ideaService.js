/**
 * Created by brillwill on 16/10/5.
 */
app.service("ideaService", ["util", "$q", "httpHelper", function (util, $q, httpHelper) {
    this.ideaSource = function () {
        return httpHelper.sendRequest("POST", "./api/idea/list", {});
    }

    this.getIdeaById = function (id) {
        return httpHelper.sendRequest("GET", "./api/idea/id/"+id);
    }

    this.updateIdeaById = function(id, updateContent){
        return httpHelper.sendRequest("POST", "./api/idea/update/"+id, updateContent);
    }

    this.addIdea = function(data){
        return httpHelper.sendRequest("POST", "./api/idea/add", data);
    }

    this.submitIdea = function(id, content){
        return httpHelper.sendRequest("POST", "./api/idea/publish/"+id, content);
    }
}]);