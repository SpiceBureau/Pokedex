import '../../css/style.css'
import PokemonList from './PokemonList'
import React, { useState, useEffect } from 'react';
import PageNavigation from './PageNavigation';
import FilterRow from './FilterRow';

const NUMOF_GEN_123_POKEMON = 386;

const MainScreen = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(Math.floor((NUMOF_GEN_123_POKEMON / 50) + 1));
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1 className='header'>Gen I, II, and III Pokemon</h1>
      <div>
        <FilterRow onPokemonPerPageChange={handlePokemonPerPageChange}/>
      </div>
      <div>
        <PokemonList currentPage={currentPage} pokemonPerPage={pokemonPerPage} setPokemonPerPage={setPokemonPerPage}/>
      </div>
      <div>
        <PageNavigation currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default MainScreen;
