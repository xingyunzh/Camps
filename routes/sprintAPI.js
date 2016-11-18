var sprintController = require('../controllers/sprintController');
var authenticator = require('../authenticate/authenticator');
var router = require('express').Router();

router.get('/project/:id',sprintController.getSprintsByProject);

router.post('/update/:id',sprintController.update);

router.post('/add',sprintController.create);

router.get('/id/:id',sprintController.getSprintById);