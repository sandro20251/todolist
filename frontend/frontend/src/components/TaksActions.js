import './TaskActions.css'

const TaskActions = ({ handleLimparConcluidas, tasks, handleMarcarTodas, loading }) => {
    return (
        <div className={'actionsContainer'}>
            {
                loading ? (
                    <label>
                        <input type="checkbox"

                            onChange={() => handleMarcarTodas(tasks)} />
                        Aguarde...
                    </label>
                ) : (<label>
                    <input type="checkbox"

                        onChange={() => handleMarcarTodas(tasks)} />
                    Marcar todas tarefas
                </label>)
            }

            {
                loading ? (<button onClick={() => handleLimparConcluidas(tasks)} className={'botao3'} disabled>Aguarde...</button>) : (<button onClick={() => handleLimparConcluidas(tasks)} className={'botao3'}>Limpar concuidas</button>)
            }

        </div>
    )
}

export default TaskActions;