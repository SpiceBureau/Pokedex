import '../../css/style.css';
import React, { useState, useEffect } from 'react';

const PokemonInfoTable = (pokemonData) => {
    const pokemon = pokemonData.pokemon.pokemon;
    const species = pokemonData.pokemon.species
    return (
        <>
            <h2>Pokémon Information</h2>
            <table>
                <tbody>
                <tr>
                    <td>№</td>
                    <td>{pokemon.id}</td>
                </tr>
                <tr>
                    <td>Type</td>
                    <td>{pokemon.types.map((typeObject) => typeObject.type.name[0].toUpperCase() + typeObject.type.name.slice(1)).join(" ")}</td>
                </tr>
                <tr>
                    <td>Species</td>
                    <td>{species}</td>
                </tr>
                <tr>
                    <td>Height</td>
                    <td>1.7 m (5′07″)</td>
                </tr>
                <tr>
                    <td>Weight</td>
                    <td>90.5 kg (199.5 lbs)</td>
                </tr>
                <tr>
                    <td>Abilities</td>
                    <td>
                    1. Blaze<br />
                    2. Solar Power (hidden ability)
                    </td>
                </tr>
                <tr>
                    <td>Local №</td>
                    <td>
                    0006 (Red/Blue/Yellow)<br />
                    0231 (Gold/Silver/Crystal)<br />
                    0006 (FireRed/LeafGreen)<br />
                    0236 (HeartGold/SoulSilver)<br />
                    0085 (X/Y — Central Kalos)<br />
                    0006 (Let's Go Pikachu/Let's Go Eevee)<br />
                    0380 (Sword/Shield)
                    </td>
                </tr>
                </tbody>
            </table>
        </>)
    }
export default PokemonInfoTable;