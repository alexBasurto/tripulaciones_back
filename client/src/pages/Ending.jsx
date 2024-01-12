import { useState } from "react";
import { createCommentApi } from "../utils/apiTripu";
import { useSession } from "../context/SessionContext";

const Ending = () => {
    const { session } = useSession();
    const [registered, setRegistered] = useState(false);

    const handleSubmit = () => {
        setRegistered(true);
        const sendComment = async () => {
            try {
                const comment = document.querySelector('input').value;
                await createCommentApi(session.idEmployee, session.idCompany, comment, true);
            } catch (error) {
                console.log(error);
            }
        }
        sendComment();
        document.querySelector('input').value = '';
        setTimeout(() => {
            setRegistered(false);
        }, 2000);
        
    }

    return (
        <div className="ending">
        <h1>Ending</h1>
        <p>¡Ya has realizado la encuesta!</p>
        <p>¿Hay algo más que nos quieras comentar?</p>
        <input type="text" placeholder="Escribe aquí" />
        <button
        onClick={() => {handleSubmit()}
        }
        >Enviar</button>
        {registered && <div className="blur"><p>Reporte enviado correctamente</p></div>}
        </div>
    );
    }

export default Ending;