import '../components/TaskItem.css'

const TaskItem = ({ loading, task, handleExcluir, setExcluirId, setTitulo, salvarEdicao, setEditingId, alterarStatus, iniciarExclusao, iniciarEdicao, titulo, excluirId, editingId }) => {
    return (
        <div className={'tarefa'}>
            <div key={task.id} className={task.completed ? 'tarefaCompleta' : 'tarefaIncompleta'}>

                {
                    excluirId === task.id ? (
                        <div>
                            <p>Tem certeza que deseja excluir  a tarefa <strong>{titulo}</strong> </p>
                            {
                                loading ? (<button onClick={() => handleExcluir(task.id)} className={'botao2'} disabled>...</button>):(<button onClick={() => handleExcluir(task.id)} className={'botao2'}>Sim</button>)
                            }
                            
                            <button onClick={() => setExcluirId(null)} className={'botao2'}>Não</button>
                        </div>

                    ) : (

                        task.id === editingId ? (
                            <div className={'editarTarefa'}>

                                <input
                                    type="text"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                />
                                <div className={'botoesEdicao'}>
                                    {
                                        loading ? (<button onClick={() => salvarEdicao(task)} className={'botao2'} disabled>
                                        Aguarde...
                                    </button>):(<button onClick={() => salvarEdicao(task)} className={'botao2'}>
                                        Salvar
                                    </button>)
                                    }
                                    

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
                                    { task.id === editingId  && loading?(<h3>...</h3>):(<h3>{task.title}</h3>)}      

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
                    )
                    
                }

            </div>
        </div>
    )
}

export default TaskItem;