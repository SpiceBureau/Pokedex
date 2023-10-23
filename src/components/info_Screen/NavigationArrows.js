import { useEffect } from 'react';
import '../../css/style.css'
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function NavigationArrows({currentPokemonID, onPreviousLinkClick, onNextLinkClick, previousPokemonName, nextPokemonName}) {
    return (
        <div className='pokemon-navigation'>
            <Link onClick={onPreviousLinkClick} className='pokemon-navigation-previous'>{"<"} #{currentPokemonID - 1} {previousPokemonName[0].toUpperCase() + previousPokemonName.slice(1)}</Link>
            <Link onClick={onNextLinkClick} className='pokemon-navigation-next'>#{currentPokemonID + 1} {nextPokemonName[0].toUpperCase() + nextPokemonName.slice(1)}{" >"}</Link>
        </div>
    );
}

export default NavigationArrows;
