import { useState } from "react";
import './TaskForm.css'

const TaskForm = ({ createNewTask, messages, setMessages }) => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);


    const handleNovaTarefa = async (e) => {
        e.preventDefault();
         const tituloMelhorado = title.trim();
        if (tituloMelhorado === "") {
            setMessages("Digite algo, não é possível salvar  uma tarefa vazia");
            return;
        }
        setLoading(true)
        try {
            await createNewTask(tituloMelhorado)
            setTitle("")
            setMessages("Tarefa criada com sucesso!")
        } catch (err) {
            setTimeout(() => {
                 setMessages('Algo deu errado') 
            }, 5000);
           
        } finally {
            setLoading(false)
        }
       
    }

    return (
        <div className={'formularioContainer'}>
            {
                loading ? (<h2>Estamos finalizando o cadastro da nova tarefa</h2>) : (<h2>Cadastre sua nova tarefa:</h2>)
            }

            <form onSubmit={handleNovaTarefa}>
                <input type="text" name="title" placeholder="Digite sua nova tarefa" onChange={(e) => setTitle(e.target.value)} value={title} />
                {
                    loading ? (<button type="submit" disabled>Aguarde</button>) : (<button type="submit">Cadastrar</button>)

                }

            </form>
        </div>

    )
}

export default TaskForm;
