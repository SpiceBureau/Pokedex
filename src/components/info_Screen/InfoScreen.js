import '../../css/style.css';
import React from 'react';
import axios from 'axios';
import PokemonImage from './PokemonImage';
import PokemonInfoTable from './PokemonInfoTable'
import BaseStatsTable from './BaseStatssTable';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavigationArrows from './NavigationArrows';
import EvolutionTree from './EvolutionTree';
import { useQueries, useQuery } from 'react-query';

const NUM_OF_POKEMON = 1010;

function traverseEvolution(rawEvolutionData) {
    if (rawEvolutionData) {
        let evolutionLine = [{
            name: rawEvolutionData.species.name,
            evolutionDetails: rawEvolutionData.evolution_details.length !== 0 ? rawEvolutionData.evolution_details[0] : null  
        }];
        if (rawEvolutionData.evolves_to) {
            for (const evolvedPokemon of rawEvolutionData.evolves_to) {
                evolutionLine.push(...traverseEvolution(evolvedPokemon));
            }
        }
        return evolutionLine;
    } else {
        return [];
    }
}
const fetchPokemon = (id) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
}
const fetchSpecies = (id) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
}
const fetchEvolution = (url) => {
    return axios.get(url);
}
const fetchSprite = (name) => {
    console.log(name)
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
}
const fetchPreviousPokemon = (id) => {
    return axios.get((`https://pokeapi.co/api/v2/pokemon/${id - 1}`))
}
const fetchNextPokemon = (id) => {
    return axios.get((`https://pokeapi.co/api/v2/pokemon/${id + 1}`))
}

const InfoScreen = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const url = window.location.href;
    const id = url.split("/").slice(-1)[0];
    let evolutionLine = []
    
    const handleLinkClick = () => {
        navigate('/')
    };
    const handlePreviousLinkClick = () => { 
        navigate(`/infoScreen/${previousPokemon.data.name.toLowerCase()}`)
    };
    const handleNextLinkClick = () => { 
        navigate(`/infoScreen/${nextPokemon.data.name.toLowerCase()}`)
    };
    const handleEvolutionSpriteClick = (evolutionSpritePokemonName) => {
        navigate(`/infoScreen/${evolutionSpritePokemonName.toLowerCase()}`)
    };

    const { data: pokemon, isLoading: isLoadingPokemon} = useQuery(['pokemon', name], () => fetchPokemon(id))
    const { data: pokemonSpecies, isLoading: isLoadingSpecies} = useQuery(['pokemonSpecies', name], () => fetchSpecies(id))
    const { data: pokemonEvolution, isLoading: isLoadingEvolution} = useQuery({
        queryKey: ['pokemonEvolution', name],
        queryFn: () => fetchEvolution(pokemonSpecies.data.evolution_chain.url),
        enabled: !!pokemonSpecies,
    })
    
    const evoChain = pokemonEvolution?.data.chain;
    evolutionLine = traverseEvolution(evoChain)

    const sprites = useQueries( 
            evolutionLine.map( (element, index) => ({
                queryKey: ["sprites", index],
                queryFn: () => fetchSprite(element.name),
                enabled: !!evoChain
            })
        )
    )

    
    const pokemonId = pokemon?.data.id;
    const { data: previousPokemon, isLoading: isLoadingPrevious} = useQuery({
        queryKey: ['previousPokemon', name],
        queryFn: () => fetchPreviousPokemon(pokemonId),
        enabled: !!pokemonId && pokemonId !== 1,
    })
    const { data: nextPokemon, isLoading: isLoadingNext} = useQuery({
        queryKey: ['nextPokemon', name],
        queryFn: () => fetchNextPokemon(pokemonId),
        enabled: !!pokemonId && pokemonId !== NUM_OF_POKEMON,
    })
 
    if (isLoadingPokemon || isLoadingEvolution || isLoadingSpecies || isLoadingNext || isLoadingPrevious || sprites[0].isLoading ) {
        return <div>Loading...</div>;
    }

    const englishGenus = pokemonSpecies?.data.genera.find((genus) => genus.language.name === 'en').genus;

    const totalStatValue = pokemon?.data.stats.reduce((sum, statsObject) => sum + statsObject.base_stat, 0);    
    const statsWithTotal = [
        ...pokemon?.data.stats.map((statsObject) => ({
            stat: (statsObject.stat.name[0].toUpperCase() + statsObject.stat.name.slice(1)).split("-").join(" "),
            value: statsObject.base_stat,
        })),
        {
            stat: "Total",
            value: totalStatValue,
        },
    ];  
    
    for (let i = 0; i < sprites.length; i++) {
        if (sprites[i] && sprites[i].data) {
            console.log(sprites[i]);
            evolutionLine[i].sprite = sprites[i].data.data.sprites.front_default;
        }
    }
    
    return (
            <div className='page'>
                <h1 className='header'><Link className='no-underline-hyperlink' onClick={handleLinkClick}> Pokémon Info </Link></h1>
                <NavigationArrows 
                    currentPokemonID={pokemon.data.id} 
                    onNextLinkClick={handleNextLinkClick} 
                    onPreviousLinkClick={handlePreviousLinkClick} 
                    previousPokemonName={previousPokemon.data.name}
                    nextPokemonName={nextPokemon.data.name}
                />
                <div className='content'>
                    <div className='infoSprite'>
                        <PokemonImage 
                        id={pokemon.data.id}
                        sprite={pokemon.data.sprites.other['official-artwork'].front_default} />
                    </div>
                    <div className="info-table">
                        <PokemonInfoTable pokemon={
                            {
                                pokemon: pokemon.data,
                                species: englishGenus,
                                abilities: pokemon.data.abilities
                            }
                        }/>
                    </div>
                    <div className='stats-table'>
                        <BaseStatsTable stats={statsWithTotal}/>
                    </div>
                </div>
                <div className='evolution-table'>
                    <EvolutionTree evolutionData={evolutionLine} onEvolutionSpriteClick={handleEvolutionSpriteClick} pokemonName={pokemon.data.name[0].toUpperCase() + pokemon.data.name.slice(1)}/>
                </div>
            </div>
        );
};

export default InfoScreen;
