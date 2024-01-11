import { useState, useEffect } from 'react';
import './PreMoodTracker.css';

const PreMoodTracker = ({activeComponent, setActiveComponent}) => {
  const [valorEmocion, setValorEmocion] = useState(50);
  const [estadoEmocion, setEstadoEmocion] = useState('normal'); // como valor predefinido

  useEffect(() => {
    if (valorEmocion <= 10) {
      setEstadoEmocion('Muy mal');
    } else if (valorEmocion <= 40) {
      setEstadoEmocion('Mal');
    } else if (valorEmocion <= 60) {
      setEstadoEmocion('Normal');
    } else if (valorEmocion <= 80) {
      setEstadoEmocion('Bien');
    } else {
      setEstadoEmocion('Muy bien');
    }
  }, [valorEmocion]);

  const manejarCambioDeslizador = (evento) => {
    setValorEmocion(evento.target.value);
  };


  return (
    <div className={`rastreador-de-emociones ${estadoEmocion}`}>
      <header>
        <h4>Estado de ánimo</h4>
      </header>
      <main>
        <h2>¿Cómo te sentiste ayer al finalizar la jornada?</h2>
        <div className={`estado-actual ${estadoEmocion.toLowerCase()}`}>
          {estadoEmocion}
        </div>
        <div className="contenedor-deslizador">
          <input
            type="range"
            min="0"
            max="100"
            value={valorEmocion}
            onChange={manejarCambioDeslizador}
            className="deslizador-emocion"
          />
          <div className="etiquetas-emocion">
            <span className="muymal">MUY MAL</span>
            <span className="muybien">MUY BIEN</span>
          </div>
        </div>
      </main>
    </div>
  );
  }

export default PreMoodTracker;