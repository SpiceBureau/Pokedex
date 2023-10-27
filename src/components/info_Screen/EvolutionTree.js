import '../../css/style.css'
import React from 'react';
import { Link } from 'react-router-dom';

const EvolutionTree = ({evolutionData, onEvolutionSpriteClick, pokemonName}) => {
    return (
        <div>
            <h2 className='evolution-header'>Evolution Tree </h2>
            <div className='evolution-tree'>
                {evolutionData.length > 1 ? (
                    evolutionData.map((object, index) => (
                        <div key={object.name} className='evolution-item'>
                            {index > 0 &&  <span className='evolution-arrow'>&#8594;</span>}
                            {index > 0 && object.evolutionDetails && (
                                <span className='evolution-text'>
                                    {(object.evolutionDetails.min_level !== null ?
                                        `(At level ${object.evolutionDetails.min_level})  ` : 
                                            object.evolutionDetails.item !== null ?
                                                `(Use ${object.evolutionDetails.item.name})  ` : 
                                                    object.evolutionDetails.min_happiness !== null 
                                                        ? `(High Friendship)  ` : 
                                                            object.evolutionDetails.trigger.name === "trade" 
                                                                ? '(Trade)' : ""
                                    )}
                                </span>
                            )}
                            <Link onClick={() => onEvolutionSpriteClick(object.name)}>
                                <img src={object.sprite} alt={object.name} className='evolution-sprite'/>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>{pokemonName} does not evolve</p>
                )}
            </div>
        </div>
      );
}

export default EvolutionTree