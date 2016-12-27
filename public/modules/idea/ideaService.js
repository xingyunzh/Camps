/**
 * Created by brillwill on 16/10/5.
 */
app.service("ideaService", ["util", "$q", "httpHelper", "kPageSize", function (util, $q, httpHelper, kPageSize) {
    this.ideaSource = function (value, pageNumber) {
        var url = "./api/idea/list?pageSize="+kPageSize;
        if(pageNumber){
            url += "&pageNum=" + pageNumber;
        }

        if(value){
            url += "&keyword="+ encodeURIComponent(value);
        }

        return httpHelper.sendRequest("GET", url).then(function(data){
            return {ideas:data.ideas, total:data.total};
        });
    };

    //pageNumber: -1 means in one ago
    this.ideaSourceByInnovator = function(owner, pageNumber){
        var url = "./api/idea/list/" + owner._id;
        if(pageNumber = -1){
            url += "?pageSize="+1000+"&pageNumber=" + 0;
        }
        else if(pageNumber >= 0){
            url += "?pageSize="+kPageSize+"&pageNumber=" + pageNumber;
        }

        return httpHelper.sendRequest("GET", url).then(function(data){
            return  {ideas:data.ideas, total:data.total};
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