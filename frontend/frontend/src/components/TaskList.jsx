const TaskList = ({tasks}) => {
    return (
        <div>
            <h1>Minhas tarefas:</h1>
            {
                tasks.map((task) => (
                    <p key={task.id}>{task.title}</p>
                ))
            }
        </div>

    )
}

export default TaskList;