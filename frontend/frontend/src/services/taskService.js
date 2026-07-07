
const url = "http://localhost:5000/tasks";

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

export { getTasks, createTask }

