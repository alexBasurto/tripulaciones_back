import { useState, useEffect } from 'react';
import './CurMoodTracker.css';
import muyMalIcon from '/shapes/muy-mal.svg';
import malIcon from '/shapes/mal.svg';
import normalIcon from '/shapes/normal.svg';
import bienIcon from '/shapes/bien.svg';
import muyBienIcon from '/shapes/muy-bien.svg';

const CurMoodTracker = ({curMood, setCurMood, activeComponent, setActiveComponent, }) => {
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

  const manejarCambioDeslizador = (evento) => {
    setCurMood(evento.target.value);
  };

  useEffect(() => {
    document.body.className = `rastreador-de-emociones ${moods[curMood].replace(" ", "-")}`;
    return () => {
      document.body.className = 'rastreador-de-emociones';
    };
  }, [curMood]);

  return (
    <div className={`main-container rastreador-de-emociones ${moods[curMood].replace(" ", "-")}`}>
      <header className='title'>
        <h4>Estado de ánimo</h4>
      </header>
      <main>
        <h2>¿Cómo afrontas el inicio de la jornada?</h2>
        <div className={`rotating-image-container ${moods[curMood].toLowerCase()}`}>
          <img className="rotating-image" src={icons[moods[curMood]]} alt={`Icon ${moods[curMood]}`} />
        </div>
      </main>

      <div className={`estado-actual ${moods[curMood]}`}style={{ color: 'var(--estado-color)' }}>
          {moods[curMood]}
        </div>
        <div className={`contenedor-deslizador ${moods[curMood].toLowerCase()}`}>
      <input
        type="range"
        min="1"
        max="5"
        value={curMood}
        onChange={manejarCambioDeslizador}
        className='slider-white'
      />
          <div className="etiquetas-emocion">
            <span className="muymal">MUY MAL</span>
            <span className="muybien">MUY BIEN</span>
          </div>
        </div>
    </div>
  );
}

export default CurMoodTracker;