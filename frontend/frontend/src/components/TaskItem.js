import '../components/TaskItem.css'

const TaskItem = ({task, handleExcluir, setExcluirId, setTitulo, salvarEdicao, setEditingId, alterarStatus, iniciarExclusao, iniciarEdicao, titulo, excluirId,  editingId})=>{
    return(
        <div>
             <div key={task.id} className={task.completed ? 'tarefaCompleta' : 'tarefaIncompleta'}>

                        {
                            excluirId === task.id &&
                            <div>
                                <p>Tem certeza que deseja excluir {titulo} </p>
                                <button onClick={() => handleExcluir(task.id)}>Sim</button>
                                <button onClick={() => setExcluirId(null)}>Não</button>
                            </div>

                        }

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
                                        onClick={() => iniciarExclusao(task.id, task.title)}
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
        </div>
    )
}

export default TaskItem;