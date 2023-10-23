import '../../css/style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonImage from './PokemonImage';
import PokemonInfoTable from './PokemonInfoTable'

const InfoScreen = () => {
    const [pokemon, setPokemon] = useState({});
    const [species, setSpieces] = useState({});
    const [abilities, setAbilities] = useState({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const url = window.location.href;
        const id = url.split("/").slice(-1)[0];
        const fetchPokemon = async () => {
            try {
                const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const data = pokemonResponse.data;

                const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
                const englishGenus = speciesResponse.data.genera.find((genus) => genus.language.name === 'en').genus;

                
                setPokemon(data);
                setSpieces(englishGenus);
                setAbilities(data.abilities);
                setLoading(false); 
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); 
            }
        };
  
      fetchPokemon();
    }, []); 

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className='page'>
            <h1 className='header'>Pokémon Info</h1>
            <div className='content'>
                <div className='infoSprite'>
                    <PokemonImage id={pokemon.id} sprite={pokemon.sprites.other.dream_world.front_default} />
                </div>
                <div className="info-table">
                    <PokemonInfoTable pokemon={
                        {
                            pokemon: pokemon,
                            species: species,
                            abilities: abilities
                        }
                    }/>
                </div>
            </div>
        </div>
    );
};

export default InfoScreen;
