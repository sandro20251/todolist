import { useState, useEffect } from "react";
import { getTasks, createTask, deleteTask, updateTask } from "../services/taskService";

const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const todasTarefas = async () => {
            const tarefas = await getTasks();
            setTasks(tarefas)
        }
        todasTarefas();
    }, [])

    const createNewTask = async (title) => {
        
        await createTask(title)
        const tarefas = await getTasks();
        setTasks(tarefas)
    
    }
    const deleteExistingTask = async (id) => {
       
        await deleteTask(id);
        const tarefas = await getTasks();
        setTasks(tarefas);
    }

    const updateExistingTask = async(id, task)=>{
       
        await updateTask(id, task);
        const tarefas = await getTasks();
        setTasks(tarefas);
        
    }

    return {
        tasks, createNewTask, deleteExistingTask, updateExistingTask
    }
}

export default useTasks;


