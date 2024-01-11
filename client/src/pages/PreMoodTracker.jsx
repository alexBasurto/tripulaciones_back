import { useState } from 'react';
import './PreMoodTracker.css';

const PreMoodTracker = ({preMood, setPreMood}) => {
  const moods = {
    1: 'muy mal',
    2: 'mal',
    3: 'normal',
    4: 'bien',
    5: 'muy bien',
  };

  const manejarCambioDeslizador = (evento) => {
    setPreMood(evento.target.value);
  };

  return (
    <div className={`rastreador-de-emociones ${moods[preMood].replace(" ", "-")}`}>
      <header>
        <h4>Estado de ánimo</h4>
      </header>
      <main>
        <h2>¿Cómo te sentiste ayer al finalizar la jornada?</h2>
        <div className={`estado-actual ${
          moods[preMood].toLowerCase()
        
        }`}>
          {estadoEmocion}
        </div>
        <div className="contenedor-deslizador">
          <input
            type="range"
            min="1"
            max="5"
            value={preMood}
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