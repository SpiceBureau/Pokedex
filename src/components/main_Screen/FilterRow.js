import '../../css/style.css'
import React from 'react';

function FilterRow({ onPokemonPerPageChange }) {
    const handlePokemonPerPageChange = (event) => {
        onPokemonPerPageChange(event);
      };
    return (
        <>
        <form action="/action_page.php">
            <label htmlFor="pokemonNum">Number of Pokemon per page</label>
            <select name="pokemonNum" id="pokeNum" onChange={handlePokemonPerPageChange}>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
            </select>
        </form>
        </>
    );
}

export default FilterRow;
