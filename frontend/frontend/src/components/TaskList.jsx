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
    const [marcarTodas, setMarcarTodas] = useState(false);
    const [loading, setLoading] = useState(false);


    const [excluirId, setExcluirId] = useState(null)

    const mostrarMensagens = (texto) => {

        setMessages(texto)
        setTimeout(() => {
            setMessages(null)
        }, 5000)
    }

    const iniciarEdicao = (id, titulo) => {

        setEditingId(id);
        setTitulo(titulo);
    };

    const iniciarExclusao = (id, titulo) => {
        setExcluirId(id);
        setTitulo(titulo)
    }

    const salvarEdicao = async (task) => {

        const t2 = titulo.trim();

        if (t2 === "") {
            mostrarMensagens("Digite algo, não é possível salvar  uma tarefa vazia");
            return;

        }

        const updateTask = {
            title: t2,
            completed: task.completed
        };

        setLoading(true)

        try {
            await updateExistingTask(task.id, updateTask);
            setTitulo("");
            setEditingId(null);
            mostrarMensagens("Tarefa alterada com sucesso!");
        } catch (err) {
            mostrarMensagens('Algo deu errado')
        } finally {
            setLoading(false)
        }

    };

    const alterarStatus = async (task) => {
        setLoading(true)
        const objeto = {
            title: task.title,
            completed: !task.completed
        }
        try {
            await updateExistingTask(task.id, objeto);

            if (task.completed) {
                mostrarMensagens("Tarefa marcada como pendente.")

            } else {
                mostrarMensagens("Tarefa concluída.")

            }
        } catch (err) {
            mostrarMensagens('Algo deu errado')
        } finally {
            setLoading(false)
        }

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
        setLoading(true)
        try {
            await deleteExistingTask(id);
            setExcluirId(null);
            mostrarMensagens("Tarefa excluída com sucesso")
        } catch (err) {
            mostrarMensagens('Algo deu errado')
        } finally {
            setLoading(false)
        }

    }

    const handleLimparConcluidas = async (tasks) => {
        setLoading(true)
        try {
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].completed) {
                    await deleteExistingTask(tasks[i].id);
                }
            }
            mostrarMensagens("Todas tarefas concluidas removidas")
        } catch (err) {
            mostrarMensagens('Algo deu errado')
        } finally {
            setLoading(false)
        }
    }

    const handleMarcarTodas = async (tasks) => {
        const novoStatus = !marcarTodas;
        setMarcarTodas(novoStatus)
        setLoading(true)
        try {


            for (let i = 0; i < tasks.length; i++) {
                const objeto = {
                    title: tasks[i].title,
                    completed: novoStatus
                }
                await updateExistingTask(tasks[i].id, objeto)

            }
            if (novoStatus) {
                mostrarMensagens("Todas as tarefas foram concluídas");
            } else {
                mostrarMensagens("Todas as tarefas estão pendentes");
            }
        } catch (err) {
            mostrarMensagens("Algo deu errado")
        } finally {
            setLoading(false)
        }


    }
    let mensagem = "";
    if (tasks.length === 0) {
        mensagem = "Você ainda não possui nenhuma tarefa.";
    } else if (pesquisa !== "") {
        mensagem = "Nenhuma tarefa encontrada para essa pesquisa.";
    } else if (filtro === "completas") {
        mensagem = "Não existem tarefas concluídas.";
    } else if (filtro === "incompletas") {
        mensagem = "Não existem tarefas pendentes.";
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
                <TaskActions handleLimparConcluidas={handleLimparConcluidas} tasks={tasks} handleMarcarTodas={handleMarcarTodas} loading={loading} />
                <TaskSort criterio={criterio} setCriterio={setCriterio} ordem={ordem} setOrdem={setOrdem} />
            </div>


            <div className={'tarefas'}>
                {tarefasFiltradas.length > 0 ? (

                    tarefasFiltradas.map((task) => (

                        <TaskItem loading={loading} key={task.id} task={task} iniciarEdicao={iniciarEdicao} handleExcluir={handleExcluir} setExcluirId={setExcluirId} setTitulo={setTitulo} titulo={titulo} salvarEdicao={salvarEdicao} setEditingId={setEditingId} alterarStatus={alterarStatus} iniciarExclusao={iniciarExclusao} excluirId={excluirId} editingId={editingId} />

                    ))


                ) : (
                    <div className="estadoVazio">
                        <h3>{mensagem}</h3>
                        <br></br>
                    </div>
                )}

            </div>
        </div>

    );
}

export default TaskList;