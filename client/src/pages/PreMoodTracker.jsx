import { useState, useEffect } from 'react';
import './PreMoodTracker.css';
import muyMalIcon from '/shapes/muy-mal.svg';
import malIcon from '/shapes/mal.svg';
import normalIcon from '/shapes/normal.svg';
import bienIcon from '/shapes/bien.svg';
import muyBienIcon from '/shapes/muy-bien.svg';

const PreMoodTracker = ({preMood, setPreMood, activeComponent, setActiveComponent}) => {
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
    setPreMood(evento.target.value);
  };

  useEffect(() => {
    document.body.className = `rastreador-de-emociones ${moods[preMood].replace(" ", "-")}`;
    return () => {
      document.body.className = 'rastreador-de-emociones';
    };
  }, [preMood]);

  return (
    <div className={`main-container rastreador-de-emociones ${moods[preMood].replace(" ", "-")}`}>
      <header className='title'>
        <h4>Estado de ánimo</h4>
      </header>
      <main className='main-mood'>
        <h2>¿Cómo te sentiste ayer al finalizar la jornada?</h2>
        <div className={`rotating-image-container ${moods[preMood].toLowerCase()}`}>
          <img className="rotating-image" src={icons[moods[preMood]]} alt={`Icon ${moods[preMood]}`} />
        </div>
      </main>

        <div className={`estado-actual ${moods[preMood]}`}style={{ color: 'var(--estado-color)' }}>
          {moods[preMood]}
        </div>
        <div className={`contenedor-deslizador ${moods[preMood].toLowerCase()}`}>
      <input
        type="range"
        min="1"
        max="5"
        value={preMood}
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

export default PreMoodTracker;