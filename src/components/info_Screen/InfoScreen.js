import '../../css/style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonImage from './PokemonImage';
import PokemonInfoTable from './PokemonInfoTable'
import BaseStatsTable from './BaseStatssTable';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavigationArrows from './NavigationArrows';
import EvolutionTree from './EvolutionTree';

const NUM_OF_POKEMON = 1010;

const InfoScreen = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState({});
    const [species, setSpieces] = useState({});
    const [evolutionData, setEvolutionData] = useState({});
    const [abilities, setAbilities] = useState({});
    const [stats, setStats] = useState({});
    const [nextPokemonName, setNextPokemonName] = useState("")
    const [previousPokemonName, setPreviousPokemonName] = useState("")
    const [loading, setLoading] = useState(true);
    
    const handleLinkClick = () => {
        navigate('/')
    };
    const handlePreviousLinkClick = () => { 
        navigate(`/infoScreen/${previousPokemonName.toLowerCase()}`)
    };
    const handleNextLinkClick = () => { 
        navigate(`/infoScreen/${nextPokemonName.toLowerCase()}`)
    };
    
    function traverseEvolution(rawEvolutionData) {
        let evolutionLine = [{
            name: rawEvolutionData.species.name,
            lvl: rawEvolutionData.evolution_details.length !== 0 ? rawEvolutionData.evolution_details[0].min_level : []
        }];

        if (rawEvolutionData.evolves_to) {
            for (const evolvedPokemon of rawEvolutionData.evolves_to) {
                evolutionLine.push(...traverseEvolution(evolvedPokemon));
            }
        }
        return evolutionLine;
    }

    async function getSprite(name) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        return data.sprites.front_default;
      }

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const data = pokemonResponse.data;

                setPokemon(data);
                
                setAbilities(data.abilities);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchSpecies = async () => {
            try {
                const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
                const englishGenus = speciesResponse.data.genera.find((genus) => genus.language.name === 'en').genus;

                const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);
                const evoChain = evolutionResponse.data.chain;
                const evolutionLine = traverseEvolution(evoChain);  
                
                const newEvolutionLine = await Promise.all(evolutionLine.map(async (element) => {
                    const spriteResponse = await getSprite(element.name);
                    
                    return {
                        name: element.name,
                        sprite: spriteResponse,
                        lvl: element.lvl
                    };
                }));

                setSpieces(englishGenus);
                setEvolutionData(newEvolutionLine);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        const fetchStats = async () => {  
            try {
                const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const data = pokemonResponse.data;

                if (data.id !== 1){
                    const previousPokemonResponse = await axios.get((`https://pokeapi.co/api/v2/pokemon/${data.id - 1}`));
                    const previousData = previousPokemonResponse.data;
                    setPreviousPokemonName(previousData.name)
                }
                if (data.id !== NUM_OF_POKEMON){
                    const nextPokemonResponse = await axios.get((`https://pokeapi.co/api/v2/pokemon/${data.id + 1}`));
                    const nextData = nextPokemonResponse.data;
                    setNextPokemonName(nextData.name)
                }
                if (data.id === 1){
                    setPreviousPokemonName("")
                }
                
                if (data.id === NUM_OF_POKEMON){
                    setNextPokemonName("")
                }
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

                setStats(statsWithTotal);
                setLoading(false); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
  
        fetchPokemon();
        fetchSpecies();
        fetchStats();
    }, [name]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='page'>
            <h1 className='header'><Link className='no-underline-hyperlink' onClick={handleLinkClick}>Pokémon Info </Link></h1>
            <NavigationArrows 
                currentPokemonID={pokemon.id} 
                onNextLinkClick={handleNextLinkClick} 
                onPreviousLinkClick={handlePreviousLinkClick} 
                previousPokemonName={previousPokemonName}
                nextPokemonName={nextPokemonName}
            />
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
