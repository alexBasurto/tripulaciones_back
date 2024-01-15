import { useState, useEffect } from 'react';
import './Reasons.css';
import muyMalIcon from '/shapes/muy-mal.svg';
import malIcon from '/shapes/mal.svg';
import normalIcon from '/shapes/normal.svg';
import bienIcon from '/shapes/bien.svg';
import muyBienIcon from '/shapes/muy-bien.svg';

const Reasons = ({ preMood, reasons, setReasons }) => {

    const moods = {
        1: 'Muy mal',
        2: 'Mal',
        3: 'Normal',
        4: 'Bien',
        5: 'Muy bien',
      };

      const icons = {
        "Muy mal": muyMalIcon,
        "Mal": malIcon,
        "Normal": normalIcon,
        "Bien": bienIcon,
        "Muy bien": muyBienIcon,
      };
    
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

    useEffect(() => {
        document.body.className = `rastreador-de-emociones ${moods[preMood].replace(" ", "-")}`;
        return () => {
          document.body.className = 'rastreador-de-emociones';
        };
      }, [preMood]);

    return (
        <div className="reasons">
             <div className={`reasons-image-container ${moods[preMood].toLowerCase()}`}>
            <img className="reasons-image" src={icons[moods[preMood]]} alt={`Icon ${moods[preMood]}`} />
            <div className={`reasons-state ${moods[preMood]}`}style={{ color: 'var(--estado-color)' }}>
          {moods[preMood]}</div>
        </div>
            <div className="reasons-tags-box">
                <p className='reasons-question'style={{ color: 'var(--estado-color)' }}>¿A qué se debía el cómo te sentiste ayer?</p>
                <p className={`info ${maxAlert && 'max-alert'}`}style={{ marginLeft: '15%', fontSize: '10px' }}>Selecciona 3 opciones como máximo</p>
                <div className="reasons-tags">
                    {Object.keys(reasonsToDisplay).map((key) => {
                        const reason = reasonsToDisplay[key];
                        return (
                            <button
                                className={`reason-tag ${reasons.includes(parseInt(key, 10)) ? "selected" : "reasons-no-selected"}`}
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