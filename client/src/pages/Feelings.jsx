

const Feelings = () => {

    const badFeelings = {
        1: 'Agobio',
        2: 'Agotamiento',
        3: 'Ansiedad',
        4: 'Culpabilidad',
        5: 'Decepción',
        6: 'Desánimo',
        7: 'Disgusto',
        8: 'Enfado',
        9: 'Frustración',
        10: 'Irritación',
        11: 'Tristeza',
    }

    const neutralFeelings = {
        12: 'Alivio',
        13: 'Calma',
        14: 'Desconcierto',
        15: 'Desesperanza',
        16: 'Emoción',
        17: 'Envidia',
        18: 'Esperanza',
        19: 'Estrés',
        20: 'Fastidio',
        21: 'Indiferencia',
        22: 'Preocupación',
        23: 'Soledad',
        24: 'Sorpresa',
        25: 'Temor',
        26: 'Tranquilidad',
        27: 'Vergüenza',
    }

    const goodFeelings = {
        28: 'Alegría',
        29: 'Confianza',
        30: 'Diversión',
        31: 'Fascinación',
        32: 'Felicidad',
        33: 'Gratitud',
        34: 'Orgullo',
    }

    return (
        <div className="feelings">
        <h1>Feelings</h1>
        <div className="feelings-tags-box">
            

        </div>
        </div>
    );
    }

export default Feelings;