import { useState, useEffect } from 'react';
import './PreMoodTracker.css';

const PreMoodTracker = ({activeComponent, setActiveComponent}) => {
  const [valorEmocion, setValorEmocion] = useState(50);
  const [estadoEmocion, setEstadoEmocion] = useState('normal'); // nuevo estado para el texto del estado emocional

  useEffect(() => {
    if (valorEmocion <= 20) {
      setEstadoEmocion('muy mal');
    } else if (valorEmocion <= 40) {
      setEstadoEmocion('mal');
    } else if (valorEmocion <= 60) {
      setEstadoEmocion('normal');
    } else if (valorEmocion <= 80) {
      setEstadoEmocion('bien');
    } else {
      setEstadoEmocion('muy bien');
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
        <div className="estado-actual">{estadoEmocion.toUpperCase()}</div>
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
            <span className="muy-mal">MUY MAL</span>
            <span className="muy-bien">MUY BIEN</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreMoodTracker;