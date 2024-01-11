import { useState } from 'react';
import './CurMoodTracker.css';

const CurMoodTracker = ({activeComponent, setActiveComponent, curMood, setCurMood}) => {
  const moods = {
    1: 'muy mal',
    2: 'mal',
    3: 'normal',
    4: 'bien',
    5: 'muy bien',
  };

  const manejarCambioDeslizador = (evento) => {
    setCurMood(evento.target.value);
  };

  return (
    <div className={`rastreador-de-emociones ${moods[curMood].replace(" ", "-")}`}>
      <header>
        <h1>Estado de ánimo</h1>
      </header>
      <main>
        <h2>¿Cómo afrontas el inicio de la jornada?</h2>
        <div className="estado-actual">{
          moods[curMood].toUpperCase()
        }</div>
        <div className="contenedor-deslizador">
          <input
            type="range"
            min="1"
            max="5"
            value={curMood}
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

export default CurMoodTracker;