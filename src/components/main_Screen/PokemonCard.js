import '../../css/pokeCard.css'
import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function PokemonCard({ name, sprite, cleanName }) {
  const navigate = useNavigate();

  const handleLinkClick = (e) => { 
    if (e.button === 1) {
        window.open(`${window.location.origin}/infoScreen/${cleanName}`)
      }
    if (e.button === 0){
        navigate(`/infoScreen/${cleanName}`);
      }
  }
  const handleMiddleClick = (e) => { 
    if (e.button === 1) {
        e.preventDefault();
        window.open(`${window.location.origin}/infoScreen/${cleanName}`)
      }
  }
    return (
        <Link onMouseDown={handleLinkClick}>
            <div className="card">
                <img src={sprite} alt={name} />
                <p>{name}</p>
            </div>
        </Link>
    );
    }

export default PokemonCard;
