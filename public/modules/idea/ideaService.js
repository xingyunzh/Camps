/**
 * Created by brillwill on 16/10/5.
 */
app.service("ideaService", ["util", "$q", "httpHelper", function (util, $q, httpHelper) {
    this.ideaSource = function (value) {
        return httpHelper.sendRequest("GET", !!value ? "./api/idea/list?keyword="+value : "./api/idea/list").then(function(data){
            return data.ideas;
        });
    };

    this.ideaSourceByInnovator = function(owner){
        return httpHelper.sendRequest("GET", "./api/idea/list/" + owner._id).then(function(data){
            return data.ideas;
        });
    };

    this.getIdeaById = function (id) {
        return httpHelper.sendRequest("GET", "./api/idea/id/"+id).then(function (data) {
            return data.idea;
        });
    };

    this.updateIdeaById = function(id, updateContent){
        return httpHelper.sendRequest("POST", "./api/idea/update/"+id, updateContent).then(function(data){
            return data.idea;
        });
    };

    this.addIdea = function(data){
        return httpHelper.sendRequest("POST", "./api/idea/add", data).then(function(resData){
            return resData.idea;
        });
    };

    this.submitIdea = function(id, content){
        return httpHelper.sendRequest("POST", "./api/idea/publish/"+id, content).then(function(data){
            return data.idea;
        });
    };
}]);