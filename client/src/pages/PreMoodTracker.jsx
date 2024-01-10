import { useState, useEffect } from 'react';
import './PreMoodTracker.css';

const PreMoodTracker = ({activeComponent, setActiveComponent}) => {
  const [valorEmocion, setValorEmocion] = useState(3);
  const [estadoEmocion, setEstadoEmocion] = useState('normal');

  useEffect(() => {
    if (valorEmocion == 1) {
      setEstadoEmocion('muy mal');
    } else if (valorEmocion == 2) {
      setEstadoEmocion('mal');
    } else if (valorEmocion == 3) {
      setEstadoEmocion('normal');
    } else if (valorEmocion == 4) {
      setEstadoEmocion('bien');
    } else if (valorEmocion == 5) {
      setEstadoEmocion('muy bien');
    }
  }, [valorEmocion]);

  const manejarCambioDeslizador = (evento) => {
    setValorEmocion(evento.target.value);
  };

  const manejarEnvio = () => {
    setActiveComponent('feelings');
  };

  return (
    <div className={`rastreador-de-emociones ${estadoEmocion}`}>
      <header>
        <h1>Estado de ánimo</h1>
      </header>
      <main>
        <h2>¿Cómo te sientes ahora mismo?</h2>
        <div className="estado-actual">{estadoEmocion.toUpperCase()}</div>
        <div className="contenedor-deslizador">
          <input
            type="range"
            min="1"
            max="5"
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