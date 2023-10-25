import '../../css/style.css';


function EvolutionTree(evolutionLine) {
    console.log(evolutionLine)
    return (
        <div>
            <h2 className='evolution-header'>Evolution Tree</h2>
            <div className='evolution-tree'>
                {evolutionLine.evolutionData.length > 1 ? (
                    evolutionLine.evolutionData.map((object, index) => (
                        <div key={object.name} className='evolution-item'>
                            {index > 0 && <span className='evolution-arrow'> {"  --->"} </span>}
                            {index > 0 && object.lvl && (
                                <span className='evolution-arrow'>
                                    {(object.lvl !== null ? `(at level ${object.lvl})  ` : "")}
                                </span>
                            )}
                            {index > 0 && object.item && (
                                <span className='evolution-arrow'>
                                    {(object.items !== null ? `(Use ${object.item.name})  ` : "")}
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