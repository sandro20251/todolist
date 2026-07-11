import '../components/TaskFilter.css'

const TaskFilter = ({ filtro, handleMudarFiltro }) => {
    return (
        <div className={'botoesContainer'}>
            <button onClick={() => handleMudarFiltro("todas")}>Todas tarefas</button>
            <button onClick={() => handleMudarFiltro("completas")}>Tarefas completas</button>
            <button onClick={() => handleMudarFiltro("incompletas")}>Tarefas incompletas</button>
        </div>
    )
}

export default TaskFilter;