import useTasks from "../hooks/useTasks";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import './Tasks.css'

const Tasks = () => {

    const { tasks, createNewTask, deleteExistingTask, updateExistingTask, buscar } = useTasks();

    return (
        <div className={'tarefas'}>
            <h1 className={'tarefaTitulo'}>Tarefas:</h1>
            <TaskForm createNewTask={createNewTask} />
            <TaskList tasks={tasks} deleteExistingTask={deleteExistingTask} updateExistingTask={updateExistingTask} />

        </div>

    )
}

export default Tasks;