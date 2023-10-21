import '../css/style.css'
import PokemonList from './PokemonList'
import React, { useState, useEffect } from 'react';
import PageNavigation from './PageNavigation';

const App = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

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
