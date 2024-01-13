import { useState } from 'react';
import './Reasons.css';

const Reasons = ({ preMood, reasons, setReasons }) => {
    const [maxAlert, setMaxAlert] = useState(false);
    const reasonsToDisplay = {
        1: { text: 'Ambiente', icon: '/icons/ambienteLaboralIcon.svg' },
        2: { text: 'Carga de trabajo', icon: '/icons/cargaDeTrabajoIcon.svg' },
        3: { text: 'Comunicación', icon: '/icons/comunicacionIcon.svg' },
        4: { text: 'Conciliación', icon: '/icons/ConciliaciónIcon.svg' },
        5: { text: 'Descansos', icon: '/icons/DescansosIcon.svg' },
        6: { text: 'Motivo Personal', icon: '/icons/motivoPersonalIcon.svg' },
        7: { text: 'Reconocimiento', icon: '/icons/reconocimientoIcon.svg' },
        8: { text: 'Rendimiento', icon: '/icons/rendimientoIcon.svg' },
        9: { text: 'Salario', icon: '/icons/salarioIcon.svg' },
        10: { text: 'Salud', icon: '/icons/saludIcon.svg' },
        11: { text: 'Sueño', icon: '/icons/sueñoIcon.svg' },
        12: { text: 'Transporte', icon: '/icons/transporteIcon.svg' },
    }

    return (
        <div className="reasons">
            <div className="reasons-tags-box">
                <p className='reasons-question'>¿A qué se debía el cómo te sentiste ayer?</p>
                <p className={`info ${maxAlert && 'max-alert'}`}>Selecciona 3 opciones como máximo</p>
                <div className="reasons-tags">
                    {Object.keys(reasonsToDisplay).map((key) => {
                        const reason = reasonsToDisplay[key];
                        return (
                            <button
                                className={`reason-tag ${reasons.includes(parseInt(key, 10)) ? "selected" : "no-selected"}`}
                                key={key}
                                onClick={() => {
                                    const keyNum = parseInt(key, 10);
                                    if (reasons.length === 3 && !reasons.includes(keyNum)) {
                                        setMaxAlert(true);
                                        setTimeout(() => {
                                            setMaxAlert(false);
                                        }, 2000);
                                        return;
                                    }
                                    setReasons(reasons.includes(keyNum) ? reasons.filter((reason) => reason !== keyNum) : [...reasons, keyNum]);
                                }}
                            >
                                <img src={reason.icon} alt={reason.text} className="reason-icon" />
                                <span className="reason-text">{reason.text}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );

}

export default Reasons;