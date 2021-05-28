import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [display, setDisplay] = useState();
  
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=5')
      .then((response) => setDisplay(JSON.stringify(response.data)))
      .catch((error) => setDisplay(JSON.stringify(error)))
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Upload this and see what happens.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>{display}</div>
      </header>
    </div>
  );
}

export default App;
