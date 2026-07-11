import '../components/TasksStats.css'

const TasksStats = ({tasks}) => {

    const todasTarefas = tasks.length;
    const tarefasCompletas = tasks.filter((task) => task.completed).length;
    const tarefasIncompletas = tasks.filter((task) => !task.completed).length;


    return (
        
            <div className={'estatisticasContainer'}>
                <h2>Estatísticas de tarefas</h2>
                <div className={'tipoEstatistica'}>
                    <h3>Tarefas: <span>{todasTarefas}</span></h3>
                    <h3>Completas: <span>{tarefasCompletas}</span></h3>
                    <h3>Incompletas: <span>{tarefasIncompletas}</span></h3>
                </div>

            </div>

        
    )
}

export default TasksStats;