
const url = `${process.env.REACT_APP_API_URL}/tasks`;

const getTasks = async () => {
    const tarefas = await fetch(url);
    const tasks = await tarefas.json();
    return tasks.tasks
}

const createTask = async (title) => {
    const task = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ title })
    })
    const tarefaCriada = await task.json();
    return tarefaCriada;
}

const updateTask = async (id, task) => {
    const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(task)
    })
    const taskJson = await response.json();
    return taskJson;

}

const deleteTask = async (id) => {
    const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        }
    })
    const data = await response.json();
    return data;
}

export { getTasks, createTask, updateTask, deleteTask }

