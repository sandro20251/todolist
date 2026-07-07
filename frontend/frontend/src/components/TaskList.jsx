import { useState } from "react";

const TaskList = ({ tasks, deleteExistingTask, updateExistingTask }) => {

    const [editingId, setEditingId] = useState(null);
    const [titulo, setTitulo] = useState("");

    const iniciarEdicao = (id, titulo) => {
        setEditingId(id);
        setTitulo(titulo);
    };

    const salvarEdicao = async (task) => {

        const objeto = {
            title: titulo,
            completed: task.completed
        };

        await updateExistingTask(task.id, objeto);

        setTitulo("");
        setEditingId(null);
    };


    return (
        <div>
            <h1>Minhas tarefas:</h1>

            {
                tasks.map((task) => (

                    <div key={task.id}>

                        {
                            task.id === editingId ? (

                                <div>
                                    <input
                                        type="text"
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                    />

                                    <button onClick={() => salvarEdicao(task)}>
                                        Salvar
                                    </button>

                                    <button onClick={() => setEditingId(null)}>
                                        Cancelar
                                    </button>
                                </div>

                            ) : (

                                <div>
                                    <p>{task.title}</p>

                                    <button 
                                        onClick={() => deleteExistingTask(task.id)}
                                    >
                                        Excluir
                                    </button>

                                    <button 
                                        onClick={() => iniciarEdicao(task.id, task.title)}
                                    >
                                        Editar
                                    </button>
                                </div>

                            )
                        }

                    </div>

                ))
            }

        </div>
    );
};

export default TaskList;