import '../../css/style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonImage from './PokemonImage';
import PokemonInfoTable from './PokemonInfoTable'
import BaseStatsTable from './BaseStatssTable';
import { Link, useNavigate } from 'react-router-dom';

const InfoScreen = () => {
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState({});
    const [species, setSpieces] = useState({});
    const [abilities, setAbilities] = useState({});
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    
    const handleLinkClick = () => {
        navigate('/')
    };
    useEffect(() => {
        const url = window.location.href;
        const id = url.split("/").slice(-1)[0];
        const fetchPokemon = async () => {
            try {
                const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const data = pokemonResponse.data;

                const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
                const englishGenus = speciesResponse.data.genera.find((genus) => genus.language.name === 'en').genus;

                const totalStatValue = data.stats.reduce((sum, statsObject) => sum + statsObject.base_stat, 0);
                const statsWithTotal = [
                ...data.stats.map((statsObject) => ({
                    stat: (statsObject.stat.name[0].toUpperCase() + statsObject.stat.name.slice(1)).split("-").join(" "),
                    value: statsObject.base_stat,
                })),
                {
                    stat: "Total",
                    value: totalStatValue,
                },
                ];
                
                setPokemon(data);
                setSpieces(englishGenus);
                setAbilities(data.abilities);
                setStats(statsWithTotal);
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
            <Link onClick={handleLinkClick}><h1 className='header'>Pokémon Info</h1></Link>
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
                <div className='stats-table'>
                    <BaseStatsTable stats={stats}/>
                </div>
            </div>
        </div>
    );
};

export default InfoScreen;
