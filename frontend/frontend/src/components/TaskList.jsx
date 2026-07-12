import { useState } from "react";
import '../components/TaskList.css'
import TasksStats from "./TasksStats";
import TaskSearch from "./TaskSearch";
import TaskFilter from "./TaskFilter";
import TaskSort from "./TaskSort";
import TaskItem from "./TaskItem";
import TaskActions from "./TaksActions";


const TaskList = ({ tasks, deleteExistingTask, updateExistingTask, messages, setMessages }) => {

    const [editingId, setEditingId] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [filtro, setFiltro] = useState("todas");
    const [pesquisa, setPesquisa] = useState("");
    const [ordem, setOrdem] = useState("crescente");
    const [criterio, setCriterio] = useState("titulo");
    const [marcarTodas, setMarcarTodas] = useState(true);


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
        setMessages(
            task.completed
                ? "Tarefa marcada como pendente."
                : "Tarefa concluída."
        );

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
        setMessages("Tarefa excluida com sucesso")
    }

    const handleLimparConcluidas = async (tasks) => {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].completed) {
                await deleteExistingTask(tasks[i].id);
            }

        }
        setMessages("Tarefas concluidas removidas")
    }

    const handleMarcarTodas = async (tasks) => {
        const novoStatus = !marcarTodas;
        setMarcarTodas(novoStatus);

        for (let i = 0; i < tasks.length; i++) {
            const objeto = {
                title: tasks[i].title,
                completed: marcarTodas
            }
            await updateExistingTask(tasks[i].id, objeto)

        }
        if (marcarTodas === true) {
            setMessages("Todas as tarefas foram concluídas")
        } else (
            setMessages("Todas as tarefas estão pendentes")
        )


    }

    return (
        <div className={'listContainer'}>


            <div>
                <TasksStats tasks={tasks} />
                <TaskSearch pesquisa={pesquisa} setPesquisa={setPesquisa} />
            </div>
            <div className={'tituloFiltro'}>
                <h2 className={'tituloList'}>Minhas tarefas:</h2>
                <TaskFilter handleMudarFiltro={handleMudarFiltro} filtro={filtro} />
            </div>
            <div className={'sortActions'}>
                <TaskActions handleLimparConcluidas={handleLimparConcluidas} tasks={tasks} handleMarcarTodas={handleMarcarTodas} />
                <TaskSort criterio={criterio} setCriterio={setCriterio} ordem={ordem} setOrdem={setOrdem} />
            </div>


            <div>
                {tarefasFiltradas.length === 0 &&
                    <p>Nenhuma tarefa encontrada</p>
                }
            </div>
            <div className={'tarefas'}>
                {
                    tarefasFiltradas.map((task) => (

                        <TaskItem key={task.id} task={task} iniciarEdicao={iniciarEdicao} handleExcluir={handleExcluir} setExcluirId={setExcluirId} setTitulo={setTitulo} titulo={titulo} salvarEdicao={salvarEdicao} setEditingId={setEditingId} alterarStatus={alterarStatus} iniciarExclusao={iniciarExclusao} excluirId={excluirId} editingId={editingId} />

                    ))
                }
            </div>
        </div>

    );
}




export default TaskList;