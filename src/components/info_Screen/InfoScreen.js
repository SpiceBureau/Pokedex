import '../../css/style.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonImage from './PokemonImage'


const InfoScreen = () => {
  const url = window.location.href;
  const id = url.split("/").slice(-1)[0];
  const [pokemonSprite, setPokemonSprite] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const requestLink = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await axios.get(requestLink);
        const data = response.data;
        setPokemonSprite(data.sprites.other.dream_world.front_default);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPokemon();
    setLoading(false);
    }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className='header'>Pokémon Info</h1>
      <PokemonImage id={id} sprite={pokemonSprite}/>
    </div>
  );
};

export default InfoScreen;
