import '../../css/style.css'
import React, { useState, useEffect } from 'react';


const PokemonImage = ({sprite, id}) => {

    return (
        <img src={sprite} alt={id} className='sprite-img'/>
    );
};

export default PokemonImage;
