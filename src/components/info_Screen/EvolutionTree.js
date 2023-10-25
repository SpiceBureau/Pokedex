import '../../css/style.css';


function EvolutionTree(evolutionLine) {
    console.log(evolutionLine)
    return (
        <div>
            <h2 className='evolution-header'>Evolution Tree </h2>
            <div className='evolution-tree'>
                {evolutionLine.evolutionData.length > 1 ? (
                    evolutionLine.evolutionData.map((object, index) => (
                        <div key={object.name} className='evolution-item'>
                            {index > 0 &&  <span className='evolution-arrow'>&#8594;</span>}
                            {index > 0 && object.evolutionDetails && (
                                <span className='evolution-text'>
                                    {(object.evolutionDetails.min_level !== null ?
                                        `(At level ${object.evolutionDetails.min_level})  ` : 
                                            object.evolutionDetails.item !== null ?
                                                `(Use ${object.evolutionDetails.item.name})  ` : 
                                                    object.evolutionDetails.min_happiness !== null 
                                                        ? `(High Friendship)  ` : ""
                                    )}
                                </span>
                            )}
                            <img src={object.sprite} alt={object.name} className='evolution-sprite'/>
                        </div>
                    ))
                ) : (
                    <p>This pokemon does not evolve</p>
                )}
            </div>
        </div>
      );      
  }

export default EvolutionTree