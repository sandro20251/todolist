import useTasks from "../hooks/useTasks";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Tasks = () => {

    const { tasks, createNewTask, deleteExistingTask, updateExistingTask, buscar } = useTasks();

    return (
        <div>
            <TaskForm createNewTask={createNewTask}/>
            <TaskList tasks={tasks} deleteExistingTask={deleteExistingTask} updateExistingTask={updateExistingTask}  />

        </div>

    )
}

export default Tasks;