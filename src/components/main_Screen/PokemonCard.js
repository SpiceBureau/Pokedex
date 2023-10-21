import '../../css/pokeCard.css'
import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function PokemonCard({ name, sprite, id }) {
  const navigate = useNavigate();

  const handleLinkClick = () => { 
    navigate(`/infoScreen/${id}`);
  }
  return (
    <Link onClick={handleLinkClick}>
      <div className="card">
      <img src={sprite} alt={name} />
      <p>{name}</p>
    </div>
    </Link>
  );
}

export default PokemonCard;
