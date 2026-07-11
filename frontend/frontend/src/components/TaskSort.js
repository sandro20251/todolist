import '../components/TaskSort.css';

const TaskSort = ({criterio, setCriterio, ordem, setOrdem}) => {
    return (
        <div className={'sortContainer'}> 
            <div>
                <select name="criterio" onChange={(e) => setCriterio(e.target.value)} value={criterio}>
                    <option value="titulo">Título</option>
                    <option value="status">Status</option>
                </select>

            </div>
            <div>
                <select name="ordem" onChange={(e) => setOrdem(e.target.value)} value={ordem}>
                    <option value="crescente">A - Z</option>
                    <option value="decrescente">Z - A</option>
                </select>
            </div>
        </div>
    )
}

export default TaskSort;