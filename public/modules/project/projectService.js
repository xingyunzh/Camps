/**
 * Created by brillwill on 16/10/6.
 */
app.service("projectService", ["util", "$q", "httpHelper", "kPageSize", function (util, $q, httpHelper, kPageSize) {
    this.projectSource = function (value, pageNumber) {
        var url = "./api/project/list?pageSize="+kPageSize;
        if (!!value){
            url += "&keyword=" + value;
        }

        if(pageNumber){
            url += "&pageNum="+pageNumber;
        }

        return httpHelper.sendRequest("GET", url).then(function(data){
            return {projects:data.projects, total:data.total};
        });
    };

    this.getProjectById = function (id){
        return httpHelper.sendRequest("GET", "./api/project/id/"+id).then(function(data){
            return data.project;
        });
    };
    
    this.add = function(params) {
        return httpHelper.sendRequest("POST", "./api/project/add", params).then(function(data){
            return data.project;
        });
    };

    this.update = function(project, params) {
        return httpHelper.sendRequest("POST","./api/project/update/"+project._id, params).then(function(data){
            return data.project;
        });
    };

    this.getProjectsByIdea = function(id){
        return httpHelper.sendRequest("GET", "./api/project/list?idea=" + id).then(function(data){
            return data.projects;
        });
    };

    this.getBacklogByProject = function(project) {
        return httpHelper.sendRequest("GET", "./api/story/project/"+project._id).then(function(data){
            return data.backlog;
        });
    };
    
    this.updateProjectBacklogPriority = function (project, backlog) {
        return httpHelper.sendRequest("POST", "./api/project/update/"+project._id, {backlog:backlog}).then(function(data){
            return data.project;
        });
    };

    this.createStoryForProject = function (story, project) {
        return httpHelper.sendRequest("POST", "./api/story/add/" + project._id, {
            as: story.as,
            want: story.want,
            soThat: story.soThat
        })
            .then(function (data) {
                return data.userStory;
            });
    };

    this.updateStory = function(story){
        if(story._id){
            return httpHelper.sendRequest("POST", "./api/story/update/"+story._id, story).then(function(data){
                return data.userStory;
            });
        }
        else {
            return util.promiseWithResolve(story);
        }
    };

    this.removeStory = function(story){
        if(story._id) {
            return httpHelper.sendRequest("GET", "./api/story/remove/"+story._id).then(function(data){
                return data.success;
            });
        }
        else {
            return util.promiseWithResolve(true);
        }
    };

    this.createTaskForStory = function(task, story){
        return httpHelper.sendRequest("POST", "./api/task/add/"+story._id, task).then(function(data){
            return data.task;
        });
    };

    this.updateTask = function(task){
        if (!!task._id){
            return httpHelper.sendRequest("POST", "./api/task/update/"+task._id, task).then(function(data){
                return data.task;
            });
        }
        else {
            return util.promiseWithResolve(task);
        }
    };
    
    this.removeTask = function(task){
        if (!!task._id){
            return httpHelper.sendRequest("GET", "./api/task/remove/"+task._id).then(function(data){
                return data.success;
            });
        }
        else {
            return util.promiseWithResolve(true);
        }
    };

    this.getSprintsByProject = function(project){
        return httpHelper.sendRequest("GET", "./api/sprint/project/"+project._id).then(function(data){
            return data.sprints;
        });
    };

    this.createSprintInProject = function(sprint, project){
        return httpHelper.sendRequest("POST", "./api/sprint/add/"+project._id, sprint).then(function(data){
            return data.sprint;
        });
    };

    this.updateSprint = function(sprint){
        return httpHelper.sendRequest("POST", "./api/sprint/update/"+sprint._id, sprint).then(function(data){
            return data.sprint;
        });
    };

    this.removeSprint = function(sprint){
        return httpHelper.sendRequest("GET", "./api/sprint/remove/"+sprint._id).then(function(data){
            return data.sprint;
        });
    };

}]);