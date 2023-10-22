import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard'; 
import '../../css/style.css'

const NUMOF_GEN_123_POKEMON = 1010;

const PokemonList = ({ currentPage, currentGen, onTotalPagesChange }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTotalPagesChange = (newTotalPages) => {
    onTotalPagesChange(newTotalPages);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        let limit = 50;
        if ((currentPage - 1) * 50 + limit > NUMOF_GEN_123_POKEMON) {
            limit = NUMOF_GEN_123_POKEMON - (currentPage - 1) * 50
        }
        if (currentGen != "All"){
          const requestLink = `https://pokeapi.co/api/v2/generation/${currentGen}`;
          const response = await axios.get(requestLink);
          const data = response.data.pokemon_species;
          handleTotalPagesChange(Math.floor((data.length / 50) + 1))
          const limitedData = data.slice((currentPage - 1) * 50, limit + (currentPage - 1) * 50);
          limitedData.sort((a, b) => a.url.split('/').slice(-2, -1)[0] - b.url.split('/').slice(-2, -1)[0]);
          const promises = limitedData.map(async (pokemon) => {
            const id = pokemon.url.split('/').slice(-2, -1)[0];
            const spriteResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${parseInt(id)}/`);
            return {
              name: pokemon.name,
              sprite: spriteResponse.data.sprites.front_default,
              id: id
            };
          });
          const pokemonData = await Promise.all(promises);
          setPokemonList(pokemonData);
          setLoading(false);
        }
        else {
          const requestLink = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(currentPage - 1) * 50}`;
          const response = await axios.get(requestLink);
          const data = response.data.results;
          const promises = data.map(async (pokemon) => {
            const spriteResponse = await axios.get(pokemon.url);
            const id = pokemon.url.split('/').slice(-2, -1)[0];
            return {
              name: pokemon.name,
              sprite: spriteResponse.data.sprites.front_default,
              id: id
            };
          });
          const pokemonData = await Promise.all(promises);
          setPokemonList(pokemonData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPokemon();
  }, [currentPage, currentGen]);

  if (loading) {
    return <div className='loading-text'>Loading...</div>;
  }

  return (
    <div className="container">
      {pokemonList.map((pokemon, index) => (
        <PokemonCard 
          key={pokemon.id}
          id={pokemon.id}
          cleanName={pokemon.name}
          name={"#" + pokemon.id + " " + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} 
          sprite={pokemon.sprite}
          />
      ))}
    </div>
  );
}

export default PokemonList;
