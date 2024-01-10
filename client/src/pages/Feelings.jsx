const Feelings = ({ preMood, setFeelings }) => {
    const badFeelings = {
        1: "Agobio",
        2: "Agotamiento",
        3: "Ansiedad",
        4: "Culpabilidad",
        5: "Decepción",
        6: "Desánimo",
        7: "Disgusto",
        8: "Enfado",
        9: "Frustración",
        10: "Irritación",
        11: "Tristeza",
    };

    const neutralFeelings = {
        12: "Alivio",
        13: "Calma",
        14: "Desconcierto",
        15: "Desesperanza",
        16: "Emoción",
        17: "Envidia",
        18: "Esperanza",
        19: "Estrés",
        20: "Fastidio",
        21: "Indiferencia",
        22: "Preocupación",
        23: "Soledad",
        24: "Sorpresa",
        25: "Temor",
        26: "Tranquilidad",
        27: "Vergüenza",
    };

    const goodFeelings = {
        28: "Alegría",
        29: "Confianza",
        30: "Diversión",
        31: "Fascinación",
        32: "Felicidad",
        33: "Gratitud",
        34: "Orgullo",
    };

    let feelingsToDisplay = {};
    if (preMood == 1 || preMood == 2) {
        feelingsToDisplay = badFeelings;
    } else if (preMood == 3) {
        feelingsToDisplay = neutralFeelings;
    } else if (preMood == 4 || preMood == 5) {
        feelingsToDisplay = goodFeelings;
    }

    return (
        <div className="feelings">
            <h1>Feelings</h1>
            <div className="feelings-tags-box">
                <p>¿A qué se debía el cómo te sentiste ayer?</p>
                <div className="feelings-tags">
                    {Object.keys(feelingsToDisplay).map((key) => (
                        <button
                            className="feeling-tag"
                            key={key}
                            onClick={() =>
                                setFeelings((prevFeelings) => [
                                    ...prevFeelings,
                                    feelingsToDisplay[key],
                                ])
                            }
                        >
                            {feelingsToDisplay[key]}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Feelings;