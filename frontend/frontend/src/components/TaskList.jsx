import { useState } from "react";
import '../components/TaskList.css'


const TaskList = ({ tasks, deleteExistingTask, updateExistingTask }) => {

    const [editingId, setEditingId] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [filtro, setFiltro] = useState("todas");
    const [pesquisa, setPesquisa] = useState("");

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
        tarefasFiltradas = tasks.filter((task) => task.title.toLowerCase().includes(pesquisa.toLowerCase()))

    }

    if (filtro === "completas") {
        tarefasFiltradas = tasks.filter((task) => task.completed && task.title.toLowerCase().includes(pesquisa.toLowerCase()));
    }

    if (filtro === "incompletas") {
        tarefasFiltradas = tasks.filter((task) => !task.completed && task.title.toLowerCase().includes(pesquisa.toLowerCase()));
    }

    const todasTarefas = tasks.length;
    const tarefasCompletas = tasks.filter((task) => task.completed).length;
    const tarefasIncompletas = tasks.filter((task) => !task.completed).length;

    return (
        <div className={'listContainer'}>
            <h2 className={'tituloList'}>Minhas tarefas:</h2>
            <div>
                {tarefasFiltradas.length === 0 &&
                    <p>Nenhuma tarefa encontrada</p>
                }
            </div>
            <div className={'estatisticasContainer'}>
                <h2>Estatísticas de tarefas</h2>
                <div className={'tipoEstatistica'}>
                    <h3>Tarefas: <span>{todasTarefas}</span></h3>
                    <h3>Completas: <span>{tarefasCompletas}</span></h3>
                    <h3>Incompletas: <span>{tarefasIncompletas}</span></h3>
                </div>

            </div>
            <div className={'pesquisa'}>
                <h2>Faça sua pesquisa de tarefas aqui:</h2>
                <input type="text" placeholder="O que você está procurando?" onChange={(e) => setPesquisa(e.target.value)} value={pesquisa} />
            </div>

            <br></br>
            <div className={'botoesContainer'}>
                <button onClick={() => handleMudarFiltro("todas")}>Todas tarefas</button>
                <button onClick={() => handleMudarFiltro("completas")}>Tarefas completas</button>
                <button onClick={() => handleMudarFiltro("incompletas")}>Tarefas incompletas</button>
            </div>


            {
                
                tarefasFiltradas.map((task) => (

                    <div key={task.id} className={task.completed ? 'tarefaCompleta' : 'tarefaIncompleta'}>

                        {
                            task.id === editingId ? (

                                <div className={'editarTarefa'}>

                                    <input
                                        type="text"
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                    />
                                    <div className={'botoesEdicao'}>
                                        <button onClick={() => salvarEdicao(task)} className={'botao2'}>
                                            Salvar
                                        </button>

                                        <button onClick={() => setEditingId(null)} className={'botao2'}>
                                            Cancelar
                                        </button>
                                    </div>

                                </div>

                            ) : (

                                <div>
                                    <div className={'descricaoTarefa'}>
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => alterarStatus(task)} />
                                        <h3>{task.title}</h3>
                                    </div>


                                    <button className={'botao2'}
                                        onClick={() => deleteExistingTask(task.id)}
                                    >
                                        Excluir
                                    </button>

                                    <button className={'botao2'}
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