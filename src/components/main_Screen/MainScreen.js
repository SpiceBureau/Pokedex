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
  const [currentType, setCurrentType] = useState("All")
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleTotalPagesChange = (newTotalPages) => {
    setTotalPages(newTotalPages);
  };
  const handleGenChange = (newGen) => {
    setCurrentGen(newGen);
  };
  const handleTypeChange = (newType) => {
    setCurrentType(newType);
  };

  return (
    <div>
      <h1 className='header'>Gen I, II, III, and IV Pokemon</h1>
      <div>
        <FilterRow onGenChange={handleGenChange} onTypeChange={handleTypeChange}/>
      </div>
      <div>
        <PokemonList currentPage={currentPage} currentGen={currentGen} currentType={currentType} onTotalPagesChange={handleTotalPagesChange}/>
      </div>
      <div>
        <PageNavigation currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default MainScreen;
