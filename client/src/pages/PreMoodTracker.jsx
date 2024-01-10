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
        <h1>Estado de ánimo</h1>
      </header>
      <main>
        <h2>¿Cómo te sientes ahora mismo?</h2>
        <div className="estado-actual">{
          moods[preMood].toUpperCase()
        
        }</div>
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
            <span className="muy-mal">MUY MAL</span>
            <span className="muy-bien">MUY BIEN</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreMoodTracker;