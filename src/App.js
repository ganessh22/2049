import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [lastKey, setLastKey] = useState('');

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) {
        setLastKey(key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="app">
      <div className="key-display">
        {lastKey ? `Last key pressed: ${lastKey}` : '\u00A0'}
      </div>
      <div className="holder">
        {[...Array(16)].map((_, index) => (
          <div key={index} className="cell" />
        ))}
      </div>
    </div>
  );
}

export default App;
