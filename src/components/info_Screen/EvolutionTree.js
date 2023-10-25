import '../../css/style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EvolutionTree(evolutionLine) {
    return (
        <div>
            {evolutionLine.length > 0 ? (
                evolutionLine.evolutionLine.map((object, index) => (
                    <div key={object.name}>
                        {index > 0 && <span> {"->"} </span>}
                        {object.lvl && <span>{`${object.lvl}`}</span>}
                        <img src={object.sprite} alt={object.name} />
                    </div>
                ))
            ) : (
                <p>No evolution data available.</p>
            )}
        </div>
      );      
  }
  

export default EvolutionTree;