import '../../css/style.css';
import React, { useState, useEffect } from 'react';

const PokemonInfoTable = (pokemonData) => {
    const pokemon = pokemonData.pokemon.pokemon;
    const species = pokemonData.pokemon.species
    const abilities = pokemonData.pokemon.abilities
    const [isHovered, setIsHovered] = useState(false);
    const abilitiesList = abilities.map((abilitiyObject, index) => (
        <>
            <span
                className="tooltip-trigger"
            >
            {index + 1}. {abilitiyObject.ability.name[0].toUpperCase() + abilitiyObject.ability.name.slice(1)}
            {index !== abilitiyObject.ability.name.length - 1 && <br />} {}
            </span>
        </>
      ));

    return (
        <>
            <h2>Pokémon Information</h2>
            <table className='infoTable-cells'>
                <tbody>
                <tr>
                    <td><b>№</b></td>
                    <td>#{pokemon.id}</td>
                </tr>
                <tr>
                    <td><b>Name</b></td>
                    <td>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</td>
                </tr>
                <tr>
                    <td><b>Type</b></td>
                    <td>{pokemon.types.map((typeObject) => typeObject.type.name[0].toUpperCase() + typeObject.type.name.slice(1)).join(" ")}</td>
                </tr>
                <tr>
                    <td><b>Species</b></td>
                    <td>{species}</td>
                </tr>
                <tr>
                    <td><b>Height</b></td>
                    <td>{(pokemon.height / 10).toFixed(1)} m ({metersToFeetAndInches(pokemon.height / 10)})</td>
                </tr>
                <tr>
                    <td><b>Weight</b></td>
                    <td>{(pokemon.weight / 10).toFixed(1)} kg ({(pokemon.weight * 2.2 / 10).toFixed(1)} lbs)</td>
                </tr>
                <tr>
                    <td><b>Abilities</b></td>
                    <td>{abilitiesList}</td>
                </tr>
                </tbody>
            </table>
        </>)
    }
function metersToFeetAndInches(meters) {
    const inches = meters * 39.3701; 
    const feet = Math.floor(inches / 12).toFixed(0);
    const remainingInches = (Math.round(inches % 12)).toFixed(0);
    return `${feet}' ${remainingInches}''`
    }
export default PokemonInfoTable;