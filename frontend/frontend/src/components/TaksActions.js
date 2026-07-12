const TaskActions = ({ handleLimparConcluidas, tasks, handleMarcarTodas }) => {
    return (
        <div>
            <label>
                Marcar todas tarefas:

                <input type="checkbox"
                    
                    onChange={() => handleMarcarTodas(tasks)} />
            </label>

            <button onClick={() => handleLimparConcluidas(tasks)}>Limpar concuidas</button>
        </div>
    )
}

export default TaskActions;