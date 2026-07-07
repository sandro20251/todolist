import { useState, useEffect } from "react";
import { getTasks, createTask } from "../services/taskService";

const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const todasTarefas = async()=>{
            const tarefas = await getTasks();
            setTasks(tarefas)
        }
        todasTarefas();
    }, [])

   

    const createNewTask = async(title)=>{
        const novaTarefa = await createTask(title)
        const tarefas = await getTasks();
        setTasks(tarefas)
    }

     return {
        tasks, createNewTask
    }
}

export default useTasks;


