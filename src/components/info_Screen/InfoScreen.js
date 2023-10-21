import '../../css/style.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonImage from './PokemonImage'


const InfoScreen = ({id}) => {
  const [pokemon, setPokemon] = useState([]);
    useEffect(() => {
      const fetchPokemon = async () => {
        try {
          const requestLink = `https://pokeapi.co/api/v2/pokemon/${id}`;
          const response = await axios.get(requestLink);
          const data = response.data.results;
          const promises = data.map(async (pokemon) => {
            const spriteResponse = await axios.get(pokemon.url);
            const id = pokemon.url.split('/').slice(-2, -1)[0];
            return {
              sprite: spriteResponse.data.sprites.front_default
            };
          });
          const pokemonData = await Promise.all(promises);
          setPokemon(pokemonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchPokemon();
      }, []);

  return (
    <div>
      <h1 className='header'>Pokémon Info</h1>
      <PokemonImage id={id} sprite={pokemon.sprite}/>
    </div>
  );
};

export default InfoScreen;
