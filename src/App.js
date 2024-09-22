import React, { useState, useEffect, useRef } from 'react';
import seedrandom from 'seedrandom';
import './App.css';

function App() {
  const [lastKey, setLastKey] = useState('');
  const [seed, setSeed] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [grid, setGrid] = useState(Array(16).fill(null));
  const inputRef = useRef(null);

  useEffect(() => {
    generateRandomSeed();
  }, []);

  useEffect(() => {
    if (seed) {
      initializeGrid();
    }
  }, [seed]);

  const generateRandomSeed = () => {
    const newSeed = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    setSeed(newSeed);
  };

  const initializeGrid = () => {
    const newGrid = Array(16).fill(null);
    const rng = seedrandom(seed);

    for (let i = 0; i < 2; i++) {
      let index;
      do {
        index = Math.floor(rng() * 16);
      } while (newGrid[index] !== null);

      newGrid[index] = rng() < 0.9 ? 2 : 4;
    }

    setGrid(newGrid);
  };

  const handleSeedClick = () => {
    if (!isEditing) {
      generateRandomSeed();
    }
  };

  const handleSeedDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const handleSeedChange = (e) => {
    setSeed(e.target.value.replace(/\D/g, '').slice(0, 6));
  };

  const handleSeedBlur = () => {
    setIsEditing(false);
    if (seed.length < 6) {
      setSeed(seed.padStart(6, '0'));
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div className="logo" onClick={handleLogoClick}>
        2️⃣0️⃣4️⃣9️⃣
      </div>
      <div className="seed-display"
        onClick={handleSeedClick}
        onDoubleClick={handleSeedDoubleClick}>
        Seed:
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={seed}
            onChange={handleSeedChange}
            onBlur={handleSeedBlur}
          />
        ) : (
          <span>{seed}</span>
        )}
      </div>
      <div className="info-display">
        <div className="key-display">
          {lastKey ? `Last key pressed: ${lastKey}` : '\u00A0'}
        </div>
      </div>
      <div className="holder">
        {grid.map((value, index) => (
          <div key={index} className={`cell ${value ? `cell-${value}` : 'cell-empty'}`}>
            {value || ''}
          </div>
        ))}
      </div>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkTheme ? '☀️' : '🌙'}
      </button>
    </div>
  );
}

export default App;
