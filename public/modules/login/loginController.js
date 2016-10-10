/**
 * Created by brillwill on 16/9/14.
 */
app.controller("loginController", ["$scope", "$rootScope", function($scope, $rootScope){
	$scope.onLoad = function(){
		console.log('onload');
	}

	var queryString = getQueryString();

	if(queryString.state !== undefined){
		if(queryString.code !== undefined){

			httpHelper.sendRequest("POST", "./login/wechat",{
				code:queryString.code
			}).then(function success(data) {
				if (data.isAuthenticated) {
					$rootScope.token = data.token;
	            	$rootScope.currentUser = data.user;
				} else {
					$scope.fail = 'Login fail';
				}
	            
	        },function fail(err){
	            $scope.fail = 'Login fail';
	        });
		}
	}else{

		var universalAPI = window.location.href.split('#')[0] + '#/nav/login';

		var obj = new WxLogin({
		  id:"wechatCode", 
		  appid: "wx5ce7696222e79ca5", 
		  scope: "snsapi_login", 
		  //redirect_uri: "http%3A%2F%2Fwww.xingyunzh.com",
		  redirect_uri: encodeURIComponent(universalAPI),
		  state: "345",
		  style: "",
		  href: ""
		});
	}

	function getQueryString(){
	  	// This function is anonymous, is executed immediately and 
	  	// the return value is assigned to QueryString!
	  	var query_string = {};
	  	var query = window.location.search.substring(1);
	  	var vars = query.split("&");
	  	for (var i=0;i<vars.length;i++) {
	    	var pair = vars[i].split("=");
	        // If first entry with this name
	    	if (typeof query_string[pair[0]] === "undefined") {
	      		query_string[pair[0]] = decodeURIComponent(pair[1]);
	        	// If second entry with this name
	    	} else if (typeof query_string[pair[0]] === "string") {
	      		var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
	      		query_string[pair[0]] = arr;
	        	// If third or later entry with this name
	    	} else {
	      		query_string[pair[0]].push(decodeURIComponent(pair[1]));
	    	}
	  	} 
	  	return query_string;
	}


}]);