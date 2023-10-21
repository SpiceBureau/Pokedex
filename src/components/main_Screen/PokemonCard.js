import '../../css/pokeCard.css'
import React from 'react';

function PokemonCard({ name, sprite, id, onPokemonCardClick }) {
  const handleClick = () => {
    onPokemonCardClick(id)
  }

  return (
    <div className="card" onClick={handleClick}>
      <img src={sprite} alt={name} />
      <p>{name}</p>
    </div>
  );
}

export default PokemonCard;

