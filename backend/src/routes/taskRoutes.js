const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController')
// rota inicial
router.get('/tasks', TaskController.getAll);
router.post('/tasks', TaskController.create);

module.exports = router;