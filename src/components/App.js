import '../css/style.css'
import PokemonList from './PokemonList'
import React, { useState, useEffect } from 'react';
import PageNavigation from './PageNavigation';

const NUMOF_GEN_123_POKEMON = 386;

const App = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(Math.floor((NUMOF_GEN_123_POKEMON / 50) + 1));

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1 className='header'>Pokémon Sprite</h1>
      <div>
        <PokemonList currentPage={currentPage}/>
      </div>
      <div><PageNavigation currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /></div>
    </div>
  );
};

export default App;
