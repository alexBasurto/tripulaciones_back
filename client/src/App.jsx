import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [moodValue, setMoodValue] = useState(50); // Valor inicial a la mitad del rango del slider

  // Función para calcular el color del fondo basado en el valor del slider
  const calculateBackgroundColor = (value) => {
    // Valores de color en RGB para rojo y verde
    const red = [255, 0, 0];
    const green = [0, 128, 0];
    
    // Interpolación lineal entre dos valores
    const mix = (start, end, weight) => {
      return Math.round(start * (1 - weight) + end * weight);
    };

    // Calcular el peso basado en la posición del slider
    const weight = value / 100;

    // Mezclar los colores rojo y verde basado en el peso
    const mixedColor = red.map((start, index) => mix(start, green[index], weight));

    return `rgb(${mixedColor.join(',')})`;
  };

  // Estilos en línea para el fondo del main, que cambian con el valor del slider
  const mainStyle = {
    background: `linear-gradient(180deg, rgba(255,222,173,1) 0%, ${calculateBackgroundColor(moodValue)} 100%)`
  };

  // Manejador para los cambios del slider
  const handleMoodChange = (event) => {
    setMoodValue(event.target.value);
  };

  // Texto que cambia basado en el valor del slider
  const moodText = moodValue <= 20 ? "Muy mal" :
                   moodValue <= 40 ? "Mal" :
                   moodValue <= 60 ? "Normal" :
                   moodValue <= 80 ? "Bien" : "Muy bien";

  return (
    <div className="app">
      <header>
        <button className="back-button">Atrás</button>
        <h1>Emoción</h1>
        <button className="cancel-button">Cancelar</button>
      </header>
      <main style={mainStyle}>
        <h2>¿Cómo te sientes ahora mismo?</h2>
        <div className="flower"></div> {/* Aquí se mostrará la imagen de la flor */}
        <p className="mood-text">{moodText}</p>
        <input
          type="range"
          min="0"
          max="100"
          value={moodValue}
          onChange={handleMoodChange}
          className="slider"
          step="1" // Para un rango más suave
        />
      </main>
      <footer>
        <button className="next-button">Siguiente</button>
      </footer>
    </div>
  );
};

export default App;
