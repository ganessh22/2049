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

    const handleKeyPress = (event) => {
      const key = event.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) {
        setLastKey(key);
        moveGrid(key); // Call moveGrid with the pressed key
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
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

  const moveGrid = (direction) => {
    const newGrid = [...grid]; // Create a copy of the current grid

    const combine = (arr) => {
      const temp = arr.filter(Boolean); // Remove nulls
      for (let i = 0; i < temp.length - 1; i++) {
        if (temp[i] === temp[i + 1]) {
          temp[i] *= 2; // Combine the numbers
          temp.splice(i + 1, 1); // Remove the next number
        }
      }
      return [...temp, ...Array(4 - temp.length).fill(null)]; // Fill with nulls
    };

    if (direction === 'w') {
      for (let col = 0; col < 4; col++) {
        const column = [];
        for (let row = 0; row < 4; row++) {
          column.push(newGrid[row * 4 + col]);
        }
        const combined = combine(column);
        for (let row = 0; row < 4; row++) {
          newGrid[row * 4 + col] = combined[row];
        }
      }
    } else if (direction === 'a') {
      for (let row = 0; row < 4; row++) {
        const combined = combine(newGrid.slice(row * 4, row * 4 + 4));
        for (let col = 0; col < 4; col++) {
          newGrid[row * 4 + col] = combined[col];
        }
      }
    } else if (direction === 's') {
      for (let col = 0; col < 4; col++) {
        const column = [];
        for (let row = 0; row < 4; row++) {
          column.push(newGrid[row * 4 + col]);
        }
        const combined = combine(column.reverse());
        for (let row = 0; row < 4; row++) {
          newGrid[row * 4 + col] = combined.reverse()[row];
        }
      }
    } else if (direction === 'd') {
      for (let row = 0; row < 4; row++) {
        const combined = combine(newGrid.slice(row * 4, row * 4 + 4).reverse());
        for (let col = 0; col < 4; col++) {
          newGrid[row * 4 + (3 - col)] = combined[col];
        }
      }
    }

    setGrid(newGrid); // Update the grid state
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
