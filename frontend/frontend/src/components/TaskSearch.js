import '../components/TaskSearch.css'

const TaskSearch = ({ pesquisa, setPesquisa }) => {
    return (

        <div className={'pesquisa'}>
            <h2>Faça sua pesquisa de tarefas aqui:</h2>
            <input type="text" placeholder="O que você está procurando?" onChange={(e) => setPesquisa(e.target.value)} value={pesquisa} />
        </div>

    )
}

export default TaskSearch;