import { useState } from "react";
import { createCommentApi } from "../utils/apiTripu";
import { useSession } from "../context/SessionContext";

import './Ending.css';

const Ending = ({ justLogged }) => {
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
            <img src="cheque.png" alt="check" className="checklist" />
            {justLogged && <p className="ending-txt1">¡Bienvenido a Moodly!</p>}
            <p className="ending-txt2">¡Ya has realizado la encuesta!</p>
            <p className="ending-txt3">¿Hay algo más que nos quieras comentar?</p>
            <div className="comment-input">
                <input type="text" placeholder="Escribe aquí" />
                <div className="checkbox">
                <input type="checkbox" id="anonimousCheckbox" defaultChecked onChange={
                    () => {
                        setIsChecked(!isChecked);
                    }
                } /> <label htmlFor="anonimousCheckbox">
                    Mantener anonimato
                </label>
                </div>
                {!isChecked && <p className="alert">Tu comentario será enviado con tu identificación visible.</p>}
                <div className="ending-btn">
                    <button
                        onClick={() => { handleSubmit() }
                        }
                    >Enviar</button>
                </div>
            </div>
            {registered && <div className="blur">
                <div className="blur-content">
                    <img src="cheque.png" alt="check" className="checklist2" />
                    <p className="p-txt">Reporte enviado correctamente</p>
                </div>
            </div>}
            <p>{error}</p>
        </div>
    );
}

export default Ending;