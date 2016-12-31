var assetRepostory= require('../repositories/assetRepository');
var util = require('../util/util');
var q = require('q');
var CamproError = require('../models/CamproError');
var uuid = require('node-uuid');

exports.create = function(req,res){

	var userId = req.token.userId;

	var asset = req.body;

	if (!asset.name) {
		res.send(util.wrapBody('Invalid Parameter','E'));
		return;
	}

	if ('_id' in asset) delete asset._id;

	asset.maintainer = userId;
	asset.assetId = uuid.v1();

	assetRepostory.create(asset).then(function(result){
		return assetRepostory.findById(result._id);
	}).then(function(newAsset){
		res.send(util.wrapBody({asset:newAsset}));
	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});
	

};

exports.list = function(req,res){
	var conditions = req.query;

	assetRepostory.query(conditions).then(function(result){

		res.send(util.wrapBody({
			total:result.total,
			assets:result.list
		}));
		
	}).catch(function(err){
		console.log(err);
		if (err instanceof CamproError) {
			res.send(util.wrapBody(err.customMsg,'E'));
		}else{
			res.send(util.wrapBody('Internal Error','E'));
		}
		
	});

};

exports.update = function(req,res){
	var id = req.params.id;
	var lead = req.token.userId;
	var updates = req.body;

	if ('name' in updates && !updates.name) {
		res.send(util.wrapBody('Invalid Parameter','E'));
		return;
	}


	assetRepository
	.findById(id)
	.then(function copyToHistory(result){
		delete result._id;
		updates.editDate = new Date();

		return assetRepository.create(result);
	}).then(function updateCurrentTeam(){
		updates.editDate = new Date();
		updates.version++;
		return assetRepository.updateById(id,updates);
	}).then(function(asset){
		res.send(util.wrapBody({asset:asset}));
	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));
	});

};

exports.listAssetsByMaintainer = function(req,res){
	var conditions = req.query;
	conditions.maintainer = req.params.id;

	assetRepostory.query(conditions).then(function(result){
		res.send(util.wrapBody({
			total:result.total,
			assets:result.list
		}));
		
	}).catch(function(err){
		console.log(err);
		if (err instanceof CamproError) {
			res.send(util.wrapBody(err.customMsg,'E'));
		}else{
			res.send(util.wrapBody('Internal Error','E'));
		}
		
	});

};

exports.checkExist = function(req,res){

	var name = req.query.name;

	checkNameExist(name).then(function(exist){
		res.send(util.wrapBody({exist:exist}));
	}).catch(function(err){
		console.log(err);
		res.send(util.wrapBody('Internal Error','E'));		
	});
	
};

function checkNameExist(name){
	return assetRepository.countByName(name).then(function(count){
		return count > 0;
	});
}

exports.getAssetById = function(req,res){
	var assetId = req.params.id;

	assetRepostory.findById(assetId).then(function(result){
		res.send(util.wrapBody({asset:result}));
		
	}).catch(function(err){
		if (typeof err == String) {
			res.send(util.wrapBody(err,'E'));
		} else {
			console.log(err);
			res.send(util.wrapBody('Internal Error','E'));
		}
	});
};
