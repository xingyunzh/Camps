var ideaController = require('../controllers/ideaController.js');

var router = require('express').Router();

router.post('/add',ideaController.createIdea);

router.get('/get/:id',ideaController.getIdeaById);

router.post('/update',ideaController.updateIdea);

router.get('/delete/:id',ideaController.deleteIdea);

router.post('/check/name',ideaController.checkIfNameExists);

//two params
//pageSize & pageNum
router.post('/list',ideaController.listIdea);

module.exports = router;