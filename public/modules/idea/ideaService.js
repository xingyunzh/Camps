/**
 * Created by brillwill on 16/10/5.
 */
app.service("ideaService", ["util", "$q", "httpHelper", function (util, $q, httpHelper) {
    this.ideaSource = function (value) {
        return httpHelper.sendRequest("GET", !!value ? "./api/idea/list?keyword="+value : "./api/idea/list");
    }

    this.ideaSourceByInnovator = function(owner){
        return httpHelper.sendRequest("GET", "./api/idea/list/" + owner._id);
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