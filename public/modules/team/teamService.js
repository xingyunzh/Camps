/**
 * Created by brillwill on 16/10/6.
 */
app.service("teamService", ["httpHelper", "$q", function (httpHelper, $q) {
    this.teamSource = function (word) {
        var url = "./api/team/list";
        if (word){
            url += "?keyword="+word;
        }
        return httpHelper.sendRequest("GET", url).then(function(data){
            return data.teams;
        });
    };

    this.add = function(param) {
        return httpHelper.sendRequest("POST", "./api/team/add", param).then(function(data){
            return data.team;
        });
    };
    
    this.update = function(team, param) {
        return httpHelper.sendRequest("POST", "./api/team/update/"+team._id, param).then(function(data){
            return data.team;
        });
    };

    this.getTeamByMember = function(user) {
        return httpHelper.sendRequest("GET", "./api/team/member/"+user._id).then(function(data){
            return data.team;
        });
    };

    this.getTeamAsCoach = function(user) {
        return httpHelper.sendRequest("GET", "./api/team/list?coach="+user._id);
    };

    this.getTeamById = function(id){
        return httpHelper.sendRequest("GET", "./api/team/id/"+id).then(function(data){
            return data.team;
        });
    };
    
    this.checkName = function (name) {
        return httpHelper.sendRequest("GET", "./api/team/check?name=" + name).then(function(data){
            return data.exist;
        });
    }
}]);