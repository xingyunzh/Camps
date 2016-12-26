/**
 * Created by brillwill on 16/9/14.
 */
app.controller("loginController", ["$scope","loginService","$rootScope",function($scope,loginService,$rootScope){
	$scope.form = {
		email:'william.yu@xingyunzh.com',
		password:'',
		prompt:''
	};
	$scope.hasWechatInit = false;
	$scope.token = '';
	$scope.user = {
		nickname:''
	};

	$scope.$on('$locationChangeSuccess', function(event, current) {
		if ($scope.hasWechatInit) {
			loginByWechat();
		}
	});

	$scope.loginByEmail = function(){

		if (!$scope.form.email) {
			$scope.form.prompt = "email没填";
			return;
		}

		if (!$scope.form.password) {
			$scope.form.prompt = "密码没填";
			return;
		}

		loginService.loginByEmail($scope.form.email,$scope.form.password,checkAuth);
	};

	function loginByWechat(){
		var queryString = getQueryString();

		if(queryString.state !== undefined && queryString.code !== undefined){

			loginService.loginByWechat(queryString.code,checkAuth);
			
		}
	}

	function checkAuth(err,data){
		if (err) {
			$scope.form.prompt = err.message;
		}else{
			$scope.user = data.user;

			$rootScope.currentUser = data.user;

			$rootScope.$emit('loggedIn',data.isFirstTimeLogin);
		}
	}

	$scope.wechatInit = function(){
		var currentURL = window.location.href;
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

		$scope.hasWechatInit = true;

	};



	function getQueryString(){
	  	// This function is anonymous, is executed immediately and 
	  	// the return value is assigned to QueryString!
	  	var query_string = {};
	  	var query = window.location.href.split('?')[1];
	  	if (query !== undefined) {
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
	  	} 

	  	return query_string;
	}


}]);