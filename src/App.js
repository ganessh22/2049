import './App.css';

function App() {
  return (
    <div className="App">
      <div className="centered-square">
        {Array.from({ length: 16 }).map((_, index) => (
          <div key={index} className="small-square"></div>
        ))}
      </div>
    </div>
  );
}

export default App;
