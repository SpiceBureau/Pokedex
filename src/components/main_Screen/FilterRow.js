import '../../css/style.css'
import React from 'react';

function FilterRow({ onGenChange, onTypeChange }) {
    const handleGenChange = (event) => {
        const selectedGen = event.target.value;
        onGenChange(selectedGen);
      };
    const handleTypeChange = (event) => {
        const selectedGen = event.target.value;
        onTypeChange(selectedGen);
    };
    return (
        <>
        <div className="table">
            <div className="row">
                <div className="cell">
                <form action="/action_page.php">
                    <label htmlFor="pokeGen">Generation</label>
                    <select name="pokeGen" id="pokeGen" onChange={handleGenChange}>
                    <option value="All">All</option>
                    <option value="1">Gen I</option>
                    <option value="2">Gen II</option>
                    <option value="3">Gen III</option>
                    <option value="4">Gen IV</option>
                    </select>
                </form>
                </div>
                <div className="cell">
                    <form action="/action_page.php">
                        <label htmlFor="typing">Type</label>
                        <select name="pokeType" id="pokeType" onChange={handleTypeChange}>
                            <option value="All">All</option>
                            <option value="normal">Normal</option>
                            <option value="fire">Fire</option>
                            <option value="water">Water</option>
                            <option value="grass">Grass</option>
                            <option value="electric">Electric</option>
                            <option value="ice">Ice</option>
                            <option value="fighting">Fighting</option>
                            <option value="poison">Poison</option>
                            <option value="ground">Ground</option>
                            <option value="flying">Flying</option>
                            <option value="psychic">Psychic</option>
                            <option value="bug">Bug</option>
                            <option value="rock">Rock</option>
                            <option value="ghost">Ghost</option>
                            <option value="dragon">Dragon</option>
                            <option value="dark">Dark</option>
                            <option value="steel">Steel</option>
                            <option value="fairy">Fairy</option>
                        </select>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default FilterRow;
