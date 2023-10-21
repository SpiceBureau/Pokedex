import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard'; 
import '../css/pokemon_list.css'

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50'); // Fetch the first 10 Pokémon for this example
        const data = response.data.results;
        const promises = data.map(async (pokemon) => {
          const spriteResponse = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            sprite: spriteResponse.data.sprites.front_default,
          };
        });
        const pokemonData = await Promise.all(promises);
        setPokemonList(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {pokemonList.map((pokemon, index) => (
        <PokemonCard key={index} name={"#" + (index + 1) + " " + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} sprite={pokemon.sprite} />
      ))}
    </div>
  );
}

export default PokemonList;
