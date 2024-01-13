import { useState } from "react";
import { createCommentApi } from "../utils/apiTripu";
import { useSession } from "../context/SessionContext";

import './Ending.css';

const Ending = () => {
    const { session } = useSession();
    const [registered, setRegistered] = useState(false);
    const [error, setError] = useState('');
    const [isChecked, setIsChecked] = useState(true);

    const handleSubmit = () => {
        const sendComment = async () => {
            try {
                const comment = document.querySelector('input').value;
                await createCommentApi(session.idEmployee, session.idCompany, comment, isChecked);
            } catch (error) {
                console.log(error);
            }
        }

        const comment = document.querySelector('input').value;
        const regex = /^[^'";]{20,198}$/;
        if (regex.test(comment) && comment.length > 20) {
                setError('');
                setRegistered(true);
                sendComment();
                document.querySelector('input').value = '';
                setTimeout(() => {
                    setRegistered(false);
                }, 2000);
        } else {
            setError('El comentario debe tener entre 20 y 200 caracteres');
        }
    }

    return (
        <div className="ending">
        <h1>Ending</h1>
        <p>¡Ya has realizado la encuesta!</p>
        <p>¿Hay algo más que nos quieras comentar?</p>
        <input type="text" placeholder="Escribe aquí" />
        <input type="checkbox" id="anonimousCheckbox" defaultChecked onChange={
            () => {
                setIsChecked(!isChecked);
            }
        } /> <label htmlFor="anonimousCheckbox">
            Mantener anonimato
        </label>
        {!isChecked && <p className="alert">Tu comentario será enviado con tu identificación visible.</p>}
        <button
        onClick={() => {handleSubmit()}
        }
        >Enviar</button>
        {registered && <div className="blur"><p>Reporte enviado correctamente</p></div>}
        <p>{error}</p>
        </div>
    );
    }

export default Ending;