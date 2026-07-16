import useTasks from "../hooks/useTasks";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { useState } from "react";
import './Tasks.css'

const Tasks = () => {
    const [messages, setMessages] = useState("");

    const { tasks, createNewTask, deleteExistingTask, updateExistingTask } = useTasks();

    return (
        <div className={'tarefas2'}>
            <h1 className={'tarefaTitulo'}>Tarefas:</h1>
            <div className={messages ? 'mensagens' : ''}>
                {
                    messages &&
                    <p>{messages}</p>
                }
            </div>

            <TaskForm createNewTask={createNewTask} messages={messages} setMessages={setMessages} />
            <TaskList tasks={tasks} deleteExistingTask={deleteExistingTask} updateExistingTask={updateExistingTask} messages={messages} setMessages={setMessages} />

        </div>

    )
}

export default Tasks;