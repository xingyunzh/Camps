
var demoController = require('../controllers/demoController');

module.exports = function(app){
	app.get('/demo', demoController.demo);
	app.post('/addDemo', demoController.addDemo);

};