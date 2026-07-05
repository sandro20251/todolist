const Task = require('../models/Task');

class TaskController {
    // controller inicial

    async getAll(req, res) {
        try {
            const tasks = await Task.findAll({ raw: true })
            return res.status(200).json({ tasks });
        } catch (err) {
            return res.status(500).json({ message: "Algo deu errado: " + err.message })
        }
    }

    async create(req, res) {
        const { title } = req.body;

        if (!title) {
            return res.status(422).json({ message: "Por favor, digite o título para cadastrar a tarefa" })
        }

      

        try {
            const task = await Task.create({title});
            return res.status(201).json({task });
        } catch (err) {
            return res.status(500).json({ message: "Algo deu errado: " + err.message })
        }
    }
}

module.exports = new TaskController();