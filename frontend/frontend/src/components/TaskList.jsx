import { useState } from "react";
import '../components/TaskList.css'


const TaskList = ({ tasks, deleteExistingTask, updateExistingTask }) => {

    const [editingId, setEditingId] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [filtro, setFiltro] = useState("todas");
    const [pesquisa, setPesquisa] = useState("")


    const iniciarEdicao = (id, titulo) => {
        setEditingId(id);
        setTitulo(titulo);
    };

    const salvarEdicao = async (task) => {

        const updateTask = {
            title: titulo,
            completed: task.completed
        };

        await updateExistingTask(task.id, updateTask);

        setTitulo("");
        setEditingId(null);
    };

    const alterarStatus = async (task) => {
        const objeto = {
            title: task.title,
            completed: !task.completed
        }

        await updateExistingTask(task.id, objeto);

    }



    const handleMudarFiltro = (tipo) => {
        setFiltro(tipo)
    }

    let tarefasFiltradas = tasks;
    if (filtro === "todas") {
        tarefasFiltradas = tasks.filter((task) => task.title.includes(pesquisa))
    }


    if (filtro === "completas") {
        tarefasFiltradas = tasks.filter((task) => task.completed && task.title.includes(pesquisa));
    }

    if (filtro === "incompletas") {
        tarefasFiltradas = tasks.filter((task) => !task.completed && task.title.includes(pesquisa));
    }










    return (
        <div>
            <h1>Minhas tarefas:</h1>
            <h2>Faça sua pesquisa de tarefas aqui:</h2>
            <input type="text" placeholder="O que você está procurando?" onChange={(e) => setPesquisa(e.target.value)} value={pesquisa} />
            <br></br>
            <button onClick={() => handleMudarFiltro("todas")}>Todas tarefas</button>
            <button onClick={() => handleMudarFiltro("completas")}>Tarefas completas</button>
            <button onClick={() => handleMudarFiltro("incompletas")}>Tarefas incompletas</button>

            {
                tarefasFiltradas.map((task) => (

                    <div key={task.id} className={task.completed ? 'tarefaCompleta' : 'tarefaIncompleta'}>

                        {
                            task.id === editingId ? (

                                <div>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => alterarStatus(task)} />
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
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => alterarStatus(task)} />
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