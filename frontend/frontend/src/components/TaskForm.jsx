import { useState } from "react";
import './TaskForm.css'

const TaskForm = ({createNewTask}) => {
    const [title, setTitle] = useState("");

    const handleNovaTarefa = async(e) => {
        e.preventDefault();
        await createNewTask(title)
        setTitle("")
    }

    return (
        <div className={'formularioContainer'}>
            <h2>Cadastre sua nova tarefa:</h2>
            <form onSubmit={handleNovaTarefa}>
                <input type="text" name="title" placeholder="Digite sua nova tarefa" onChange={(e) => setTitle(e.target.value)} value={title} />
                <button type="submit">Cadastrar</button>
            </form>
        </div>

    )
}

export default TaskForm;
