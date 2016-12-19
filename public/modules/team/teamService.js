/**
 * Created by brillwill on 16/10/6.
 */
app.service("teamService", ["httpHelper", "$q", function (httpHelper, $q) {
    this.teamSource = function (word) {
        var url = "./api/team/list";
        if (word){
            url += "?keyword="+word;
        }
        return httpHelper.sendRequest("GET", url);
    }

    this.add = function(param) {
        return httpHelper.sendRequest("POST", "./api/team/add", param);
    }
    
    this.update = function(team, param) {
        return httpHelper.sendRequest("POST", "./api/team/update/"+team._id, param);
    }

    this.getTeamAsMember = function(user) {
        return httpHelper.sendRequest("GET", "./api/team/member/"+user._id);
    }

    this.getTeamAsLead = function(user) {
        return httpHelper.sendRequest("GET", "./api/team/lead/"+user._id);
    }

    this.getTeamAsCoach = function(user) {
        return httpHelper.sendRequest("GET", "./api/team/coach/"+user._id);
    }

    this.getTeamById = function(id){
        return httpHelper.sendRequest("GET", "./api/team/id/"+id);
    }
}]);