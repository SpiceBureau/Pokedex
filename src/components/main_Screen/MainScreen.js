import '../../css/style.css'
import PokemonList from './PokemonList'
import React, { useState, useEffect } from 'react';
import PageNavigation from './PageNavigation';
import FilterRow from './FilterRow';

const NUMOF_GEN_123_POKEMON = 494;

const MainScreen = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(Math.floor((NUMOF_GEN_123_POKEMON / 50) + 1));
  const [currentGen, setCurrentGen] = useState("All")
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleGenChange = (newGen) => {
    setCurrentGen(newGen);
  };
  const handleTotalPagesChange = (newTotalPages) => {
    setTotalPages(newTotalPages);
  };

  return (
    <div>
      <h1 className='header'>Gen I, II, and III Pokemon</h1>
      <div>
        <FilterRow onGenChange={handleGenChange}/>
      </div>
      <div>
        <PokemonList currentPage={currentPage} currentGen={currentGen} onTotalPagesChange={handleTotalPagesChange}/>
      </div>
      <div>
        <PageNavigation currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default MainScreen;
