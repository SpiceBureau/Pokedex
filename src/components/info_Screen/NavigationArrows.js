import '../../css/style.css'
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationArrows = ({currentPokemonID, onPreviousLinkClick, onNextLinkClick, previousPokemon, nextPokemon}) => {
    return (
        <div className="pokemon-navigation">
            {previousPokemon && previousPokemon.name !== "" && previousPokemon.id !== currentPokemonID && (
                <Link onClick={onPreviousLinkClick} className="pokemon-navigation-previous">
                    {"<"} #{currentPokemonID - 1} {previousPokemon.name[0].toUpperCase() + previousPokemon.name.slice(1)}
                </Link>
            )}
            {nextPokemon && nextPokemon.name !== "" && nextPokemon.id !== currentPokemonID && (
                <Link onClick={onNextLinkClick} className="pokemon-navigation-next">
                    #{currentPokemonID + 1} {nextPokemon.name[0].toUpperCase() + nextPokemon.name.slice(1)} {" >"}
                </Link>
            )}
        </div>
    );
}

export default NavigationArrows;
