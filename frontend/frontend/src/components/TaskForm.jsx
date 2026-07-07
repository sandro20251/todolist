import { useState } from "react";

const TaskForm = ({createNewTask}) => {
    const [title, setTitle] = useState("");

    const handleNovaTarefa = async(e) => {
        e.preventDefault();
        await createNewTask(title)
        setTitle("")
    }

    return (
        <div>
            <h1>Cadastre sua nova tarefa:</h1>
            <form onSubmit={handleNovaTarefa}>
                <input type="text" name="title" placeholder="Digite sua nova tarefa" onChange={(e) => setTitle(e.target.value)} value={title} />
                <button type="submit">Cadastrar</button>
            </form>
        </div>

    )
}

export default TaskForm;
