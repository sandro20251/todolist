import { useState } from "react";
import '../components/TaskList.css'
import TasksStats from "./TasksStats";
import TaskSearch from "./TaskSearch";
import TaskFilter from "./TaskFilter";
import TaskSort from "./TaskSort";
import TaskItem from "./TaskItem";


const TaskList = ({ tasks, deleteExistingTask, updateExistingTask }) => {

    const [editingId, setEditingId] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [filtro, setFiltro] = useState("todas");
    const [pesquisa, setPesquisa] = useState("");
    const [ordem, setOrdem] = useState("crescente");
    const [criterio, setCriterio] = useState("titulo");

    const [excluirId, setExcluirId] = useState(null)

    const iniciarEdicao = (id, titulo) => {
        setEditingId(id);
        setTitulo(titulo);
    };

    const iniciarExclusao = (id, titulo) => {
        setExcluirId(id);
        setTitulo(titulo)
    }

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

    let tarefasFiltradas = [...tasks];
    if (filtro === "todas") {
        tarefasFiltradas = tasks.filter((task) => task.title.toLowerCase().includes(pesquisa.toLowerCase()))

    }

    if (filtro === "completas") {
        tarefasFiltradas = tasks.filter((task) => task.completed && task.title.toLowerCase().includes(pesquisa.toLowerCase()));
    }

    if (filtro === "incompletas") {
        tarefasFiltradas = tasks.filter((task) => !task.completed && task.title.toLowerCase().includes(pesquisa.toLowerCase()));
    }


    if (criterio === "titulo") {
        if (ordem === "crescente") {
            tarefasFiltradas.sort((a, b) => {
                return a.title.localeCompare(b.title)
            })
        }

        if (ordem === "decrescente") {
            tarefasFiltradas.sort((a, b) => {
                return b.title.localeCompare(a.title)
            })

        }
    }

    if (criterio === "status") {
        if (ordem === "crescente") {
            tarefasFiltradas.sort((a, b) => {
                return a.completed - b.completed
            })
        }

        if (ordem === "decrescente") {
            tarefasFiltradas.sort((a, b) => {
                return b.completed - a.completed
            })

        }
    }

    const handleExcluir = async (id) => {
        await deleteExistingTask(id);
        setExcluirId(null);
    }

    return (
        <div className={'listContainer'}>
            <div className={'tituloFiltro'}>
                <h2 className={'tituloList'}>Minhas tarefas:</h2>
                <TaskFilter handleMudarFiltro={handleMudarFiltro} filtro={filtro} />
            </div>

            <div className={'estatisticasPesquisa'}>
                <TasksStats tasks={tasks} />
                <TaskSearch pesquisa={pesquisa} setPesquisa={setPesquisa} />
            </div>
            <TaskSort criterio={criterio} setCriterio={setCriterio} ordem={ordem} setOrdem={setOrdem} />
            <div>
                {tarefasFiltradas.length === 0 &&
                    <p>Nenhuma tarefa encontrada</p>
                }
            </div>

            {
                tarefasFiltradas.map((task) => (
                    <TaskItem key={task.id} task={task} iniciarEdicao={iniciarEdicao} handleExcluir={handleExcluir} setExcluirId={setExcluirId} setTitulo={setTitulo} titulo={titulo} salvarEdicao={salvarEdicao} setEditingId={setEditingId} alterarStatus={alterarStatus} iniciarExclusao={iniciarExclusao} excluirId={excluirId} editingId={editingId} />

                ))
            }
        </div>

    );
};

export default TaskList;