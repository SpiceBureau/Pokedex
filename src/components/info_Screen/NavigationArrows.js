import '../../css/style.css'
import React from 'react';
import { Link } from 'react-router-dom';

function NavigationArrows({currentPokemonID, onPreviousLinkClick, onNextLinkClick, previousPokemonName, nextPokemonName}) {
    return (
        <div className="pokemon-navigation">
            {previousPokemonName && previousPokemonName !== "" && (
                <Link onClick={onPreviousLinkClick} className="pokemon-navigation-previous">
                    {"<"} #{currentPokemonID - 1} {previousPokemonName[0].toUpperCase() + previousPokemonName.slice(1)}
                </Link>
            )}
            {nextPokemonName && nextPokemonName !== "" && (
                <Link onClick={onNextLinkClick} className="pokemon-navigation-next">
                    #{currentPokemonID + 1} {nextPokemonName[0].toUpperCase() + nextPokemonName.slice(1)} {" >"}
                </Link>
            )}
        </div>
    );
}

export default NavigationArrows;
