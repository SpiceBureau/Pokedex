import '../../css/style.css'
import React, { useState, useEffect } from 'react';


const PokemonImage = ({sprite, id}) => {

    return (
        <div>
        <img src={sprite} alt={id} />
        </div>
    );
};

export default PokemonImage;
