/**
 * Created by brillwill on 16/10/6.
 */
app.service("projectService", ["util", "$q", "httpHelper", function (util, $q, httpHelper) {
    this.projectSource = function (value) {
        var url = "./api/project/list";
        if (!!value){
            url += "?keyword=" + value;
        }
        return httpHelper.sendRequest("GET", url);
    };

    this.getProjectById = function (id){
        return httpHelper.sendRequest("GET", "./api/project/id/"+id);
    }
    
    this.add = function(params) {
        return httpHelper.sendRequest("POST", "./api/project/add", params);
    }

    this.update = function(project, params) {
        return httpHelper.sendRequest("POST","./api/project/update/"+project._id, params);
    }

    this.getProjectsByIdea = function(id){
        return httpHelper.sendRequest("GET", "./api/project/list?idea=" + id);
    }

    this.getBacklogByProject = function(project) {
        return httpHelper.sendRequest("GET", "./api/story/project/"+project._id);
    }
    
    this.updateBacklogByProject = function (project, backlog) {
        return httpHelper.sendRequest("POST", "./api/story/update/"+project._id, {userStories:backlog});
    }

}]);