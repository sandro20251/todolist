import './TaskActions.css'

const TaskActions = ({ handleLimparConcluidas, tasks, handleMarcarTodas }) => {
    return (
        <div className={'actionsContainer'}>
            <label>
                <input type="checkbox"

                    onChange={() => handleMarcarTodas(tasks)} />
                Marcar todas tarefas
            </label>

            <button onClick={() => handleLimparConcluidas(tasks)} className={'botao3'}>Limpar concuidas</button>
        </div>
    )
}

export default TaskActions;