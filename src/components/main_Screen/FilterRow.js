import '../../css/style.css'
import React from 'react';

function FilterRow({ onGenChange }) {
    const handleGenChange = (event) => {
        const selectedGen = event.target.value;
        onGenChange(selectedGen);
      };
    return (
        <>
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
        </>
    );
}

export default FilterRow;
