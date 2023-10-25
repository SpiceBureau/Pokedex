import '../../css/style.css';


function EvolutionTree(evolutionLine) {
    console.log(evolutionLine.evolutionData)
    return (
        <div className='evolution-tree'>
            {evolutionLine.evolutionData.length > 1 ? (
                evolutionLine.evolutionData.map((object, index) => (
                    <div key={object.name} className='evolution-item'>
                        {index > 0 && <span className='evolution-arrow'> {"  --->"} </span>}
                        {index > 0 && object.lvl && <span className='evolution-arrow'>{`(at level ${object.lvl})  `}</span>}
                        <img src={object.sprite} alt={object.name} className='evolution-sprite'/>
                    </div>
                ))
            ) : (
                <p>This pokemon does not evolve</p>
            )}
        </div>
      );      
  }

export default EvolutionTree