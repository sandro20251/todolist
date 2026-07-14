// const express = require('express');
// const router = express.Router();
// const TaskController = require('../controllers/TaskController')
// // rota inicial
// router.get('/tasks', TaskController.getAll);
// router.post('/tasks', TaskController.create);
// router.get('/tasks/:id', TaskController.getOne);
// router.put('/tasks/:id', TaskController.update);
// router.delete('/tasks/:id', TaskController.delete2);

// module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/tasks', (req, res) => {
    res.json({
        mensagem: "rota tasks funcionando"
    });
});

module.exports = router;