import '../css/pokeCard.css'
import React from 'react';

function PokemonCard({ name, sprite }) {
  return (
    <div className="card">
      <img src={sprite} alt={name} />
      <p>{name}</p>
    </div>
  );
}

export default PokemonCard;

