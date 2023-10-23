import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import '../../css/style.css';

const NUM_OF_POKEMON = 1010;

const PokemonList = ({ currentPage, currentFilters, onTotalPagesChange }) => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleTotalPagesChange = (newTotalPages) => {
            onTotalPagesChange(newTotalPages);
        };
        const fetchPokemon = async () => {
            try {
                let limit = 50;
                if ((currentPage - 1) * 50 + limit > NUM_OF_POKEMON) {
                    limit = NUM_OF_POKEMON - (currentPage - 1) * 50;
                }
                if (currentFilters.currentGen !== "All") {
                    const requestLink = `https://pokeapi.co/api/v2/generation/${currentFilters.currentGen}`;
                    const response = await axios.get(requestLink);
                    const data = response.data.pokemon_species;
                    data.sort((a, b) => {
                        const idA = parseInt(a.url.split('/').slice(-2, -1)[0], 10);
                        const idB = parseInt(b.url.split('/').slice(-2, -1)[0], 10);
                        return idA - idB;
                    });
                    const promises = data
                        .map(async (pokemon) => {
                            const id = pokemon.url.split('/').slice(-2, -1)[0];
                            const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${parseInt(id)}/`);
                            const types = pokemonResponse.data.types;
                            const correctType = types.some(pokeType => pokeType.type.name === currentFilters.currentType);

                            return (currentFilters.currentType === "All" || correctType) ?
                                {
                                    name: pokemon.name,
                                    sprite: currentFilters.threeDSprites ? pokemonResponse.data.sprites.other.home.front_default : pokemonResponse.data.sprites.front_default,
                                    id: id
                                } : null;
                        });
                    const pokemonData = await Promise.all(promises);
                    const filteredPokemonData = pokemonData.filter((pokemon) => pokemon !== null);

                    handleTotalPagesChange(Math.floor((filteredPokemonData.length / 50) + 1));

                    setPokemonList(filteredPokemonData.slice((currentPage - 1) * 50, limit + (currentPage - 1) * 50));
                    setLoading(false);
                } else {
                    if (currentFilters.currentType === "All") {
                        const requestLink = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(currentPage - 1) * 50}`;
                        const response = await axios.get(requestLink);
                        const data = response.data.results;
                        const promises = data
                            .map(async (pokemon) => {
                                const pokemonResponse = await axios.get(pokemon.url);
                                const id = pokemon.url.split('/').slice(-2, -1)[0];
                                return {
                                    name: pokemon.name,
                                    sprite: currentFilters.threeDSprites ? pokemonResponse.data.sprites.other.home.front_default : pokemonResponse.data.sprites.front_default,
                                    id: id
                                };
                            });
                        const pokemonData = await Promise.all(promises);
                        const filteredPokemonData = pokemonData.filter((pokemon) => pokemon !== null);

                        setPokemonList(filteredPokemonData);
                        setLoading(false);
                    } else {
                        const requestLink = `https://pokeapi.co/api/v2/type/${currentFilters.currentType}`;
                        const response = await axios.get(requestLink);
                        const data = response.data.pokemon;
                        const promises = data
                            .map(async (pokemon) => {
                                const pokemonResponse = await axios.get(pokemon.pokemon.url);
                                const id = pokemon.pokemon.url.split('/').slice(-2, -1)[0];
                                return {
                                    name: pokemon.pokemon.name,
                                    sprite: currentFilters.threeDSprites ? pokemonResponse.data.sprites.other.home.front_default : pokemonResponse.data.sprites.front_default,
                                    id: id
                                };
                            });
                        const pokemonData = await Promise.all(promises);
                        handleTotalPagesChange(Math.floor((pokemonData.length / 50) + 1));

                        setPokemonList(pokemonData.slice((currentPage - 1) * 50, limit + (currentPage - 1) * 50));
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchPokemon();
    }, [currentPage, currentFilters, onTotalPagesChange]);

    if (loading) {
        return <div className='loading-text'>Loading...</div>;
    }

    return (
        <div className="container">
            {pokemonList
                .filter((pokemon) => pokemon !== null)
                .map((pokemon, index) => (
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
