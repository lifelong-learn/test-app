import logo from './logo.svg';
import './App.css';
import { useReducer, useEffect } from 'react';
import axios from 'axios';

const actionType = {
  SET_POKEDEX_DATA: 'SET_POKEDEX_DATA'
}

const pokedexReducer = (state = [], action) => {
  switch(action.type) {
    case actionType.SET_POKEDEX_DATA:
      return action.payload;
    default:
      return state;
  }
}

function App() {
  const [pokemonData, dispatch] = useReducer(pokedexReducer, []);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=887')
      .then(response => response.data.results)
      .then((results) => {
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[`${index + 1}`] = {
            id: `${index + 1}`,
            name: pokemon.name,
            sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
              (index + 1).toString() +
              '.png'
          }
        });
        dispatch({
          type: actionType.SET_POKEDEX_DATA,
          payload: newPokemonData
        });
      })
      .catch((error) => console.log(error))
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
        <div>{JSON.stringify(pokemonData)}</div>
      </header>
    </div>
  );
}

export default App;
