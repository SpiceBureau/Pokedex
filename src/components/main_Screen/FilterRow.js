import '../../css/style.css';
import React from 'react';
import Switch from "react-switch";

function FilterRow({ onGenChange, onTypeChange, onSpriteChange }) {
    const handleGenChange = (event) => {
        const selectedGen = event.target.value;
        onGenChange(selectedGen);
    };
    const handleTypeChange = (event) => {
        const selectedGen = event.target.value;
        onTypeChange(selectedGen);
    };
    const handleSpriteChange = (event) => {
        const threeDSprites = event.target.checked;
        onSpriteChange(threeDSprites);
    };
    return (
        <>
            <div className="table">
                <div className="row">
                    <div className="cell">
                        <form action="/action_page.php">
                            <label htmlFor="pokeGen" className='label gen'>Generation</label>
                            <select name="pokeGen" id="pokeGen" onChange={handleGenChange} className='select gen'>
                                <option value="All">All</option>
                                <option value="1">Gen I</option>
                                <option value="2">Gen II</option>
                                <option value="3">Gen III</option>
                                <option value="4">Gen IV</option>
                                <option value="5">Gen V</option>
                                <option value="6">Gen VI</option>
                                <option value="7">Gen VII</option>
                                <option value="8">Gen VIII</option>
                                <option value="9">Gen IX</option>
                            </select>
                        </form>
                    </div>
                    <div className="cell">
                        <form action="/action_page.php">
                            <label htmlFor="typing" className='label type'>Type</label>
                            <select name="pokeType" id="pokeType" onChange={handleTypeChange} className='select type'>
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
                    <div className="cell">
                        <label htmlFor="sprites" className='label sprites'>3D sprites</label>
                        <input type="checkbox" className='input sprites' onChange={handleSpriteChange}></input>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilterRow;
