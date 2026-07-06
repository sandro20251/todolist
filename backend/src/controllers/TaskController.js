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
            const task = await Task.create({ title });
            return res.status(201).json({ task });
        } catch (err) {
            return res.status(500).json({ message: "Algo deu errado: " + err.message })
        }
    }

    async getOne(req, res) {
        const id = req.params.id;

        try {
            const tarefa = await Task.findByPk(id);

            if (!tarefa) {
                return res.status(404).json({ message: "Tarefa não encontrada com este id" })
            }

            return res.status(200).json({ tarefa })

        } catch (err) {
            return res.status(500).json({ message: "Algo deu errado: " + err.message })
        }

    }

    async update(req, res) {
        const id = req.params.id;

        const tarefa = await Task.findByPk(id);

        if (!tarefa) {
            return res.status(404).json({ message: "Tarefa não encontrada" });
        }

        const { title, completed } = req.body;

        if (!title) {
            return res.status(422).json({ message: "Precisamos do title para continuar a atualização" });
        }

        if (completed === undefined) {
            return res.status(422).json({ message: "Precisamos do completed para continuar a atualização" });
        }

        const prototipo = {
            title,
            completed

        }

        try {
            const tarefaAtualizada = await Task.update(prototipo, { where: { id: id } });
            res.status(200).json({ tarefaAtualizada })
        } catch (err) {
            return res.status(500).json({ message: "Algo deu errado: " + err.message })
        }
    }

    async delete2(req, res) {
        const id = req.params.id;



        try {
            const tarefa = await Task.findByPk(id);

            if (!tarefa) {
                return res.status(404).json({ message: "Tarefa não encontrada" });
            }
            await tarefa.destroy();
            res.status(200).json({ message: "tarefa deletada com sucesso!" })
        } catch (err) {
            return res.status(500).json({ message: "Algo deu errado: " + err.message })
        }


    }
}

module.exports = new TaskController();