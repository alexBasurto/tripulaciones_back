import './Reasons.css';

const Reasons = ({ preMood, reasons, setReasons }) => {

    const reasonsToDisplay = {
        1: 'Ambiente laboral',
        2: 'Carga de trabajo',
        3: 'Comunicación',
        4: 'Conciliación',
        5: 'Descansos',
        6: 'Motivos personales',
        7: 'Reconocimiento',
        8: 'Rendimiento',
        9: 'Salario',
        10: 'Salud',
        11: 'Sueño',
        12: 'Transporte',
    }

    return (
        <div className="reasons">
        <h1>Reasons</h1>
        <div className="reasons-tags-box">
                <p>¿A qué se debía el cómo te sentiste ayer?</p>
                <div className="reasons-tags">

                    {Object.keys(reasonsToDisplay).map((key) => (
                        <button
                            className={`reason-tag ${
                                reasons.includes(parseInt(key, 10))
                                    ? "selected"
                                    : ""
                            }`}
                            key={parseInt(key, 10)}
                            onClick={() => {
                                const keyNum = parseInt(key, 10);
                                if (reasons.includes(keyNum)) {
                                    setReasons(
                                        reasons.filter(
                                            (reason) => reason !== keyNum
                                        )
                                    );
                                } else {
                                    setReasons([...reasons, keyNum]);
                                }
                            }}
                        >
                            {reasonsToDisplay[key]}
                        </button>
                    ))}

                </div>
            </div>
        

        </div>
    );
    }

export default Reasons;