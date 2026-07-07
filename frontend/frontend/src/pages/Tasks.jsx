import useTasks from "../hooks/useTasks";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Tasks = () => {

    const { tasks, createNewTask } = useTasks();

    return (
        <div>
            <TaskForm createNewTask={createNewTask}/>
            <TaskList tasks={tasks} />

        </div>

    )
}

export default Tasks;