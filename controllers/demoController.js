var Item = require('../models/item');

exports.demo = function(req, res){
	Item.find(function(err, data){
		if (err) {
			res.json({code:-1, body:err});
		}
		else {
			res.json({code:0, body:data});
		}
	});
}

exports.addDemo = function(req, res){
	var name = req.body.name;
	var desc = req.body.desc;

	var item = new Item();
	item.name = name;
	item.content = desc;

	item.save(function(err, data) {
		if (err) {
			res.json({code:-2, body:err});
		}
		else {
			res.json({code:0, body:data});
		}
	});
}