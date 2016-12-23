/**
 * Created by brillwill on 16/10/6.
 */
app.service("projectService", ["util", "$q", "httpHelper", function (util, $q, httpHelper) {
    this.projectSource = function (value) {
        var url = "./api/project/list";
        if (!!value){
            url += "?keyword=" + value;
        }
        return httpHelper.sendRequest("GET", url).then(function(data){
            return data.projects;
        });
    };

    this.getProjectById = function (id){
        return httpHelper.sendRequest("GET", "./api/project/id/"+id).then(function(data){
            return data.project;
        });
    }
    
    this.add = function(params) {
        return httpHelper.sendRequest("POST", "./api/project/add", params).then(function(data){
            return data.project;
        });
    }

    this.update = function(project, params) {
        return httpHelper.sendRequest("POST","./api/project/update/"+project._id, params).then(function(data){
            return data.project;
        });
    }

    this.getProjectsByIdea = function(id){
        return httpHelper.sendRequest("GET", "./api/project/list?idea=" + id).then(function(data){
            return data.projects;
        });
    }

    this.getBacklogByProject = function(project) {
        return httpHelper.sendRequest("GET", "./api/story/project/"+project._id).then(function(data){
            return data.backlog;
        });
    }
    
    this.updateBacklogByProject = function (project, backlog) {
        return httpHelper.sendRequest("POST", "./api/story/update/"+project._id, {userStories:backlog}).then(function(data){
            return data.backlog;
        });
    }

    this.getSprintsByProject = function(project){
        return httpHelper.sendRequest("GET", "./api/sprint/project/"+project._id).then(function(data){
            return data.sprints;
        });
    }

    this.updateSprintsByProject = function(project, sprints){
        
    }

}]);