/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = require('./routes/router');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
var mongoURL = "";
if (services["mongodb-2.4"] !== undefined) {
	mongoURL = services["mongodb-2.4"][0].credentials.url;

} else {
	mongoURL = 'mongodb://127.0.0.1:27017/camps';
}

mongoose.connect(mongoURL, function(err) {
	if (err) {
		console.log("could not connect mongodb with error message "+ err)
	}
});

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended : false
}))

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

router(app);

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
