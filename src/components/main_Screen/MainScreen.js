import '../../css/style.css';
import PokemonList from './PokemonList';
import React, { useState } from 'react';
import PageNavigation from './PageNavigation';
import FilterRow from './FilterRow';

const NUM_OF_POKEMON = 1010;

const MainScreen = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(Math.floor((NUM_OF_POKEMON / 50) + 1));
    const [currentFilters, setCurrentFilters] = useState({currentGen: 'All', currentType: 'All', threeDSprites: false});

    const handlePageChange = (newPage) => {
        if (newPage > totalPages) {
            newPage = totalPages;
        }
        setCurrentPage(newPage);
    };
    const handleTotalPagesChange = (newTotalPages) => {
        setTotalPages(newTotalPages);
    };
    const handleGenChange = (newGen) => {
        setCurrentFilters({
            currentGen: newGen,
            currentType: currentFilters.currentType,
            threeDSprites: currentFilters.threeDSprites,
        });
        setCurrentPage(1);
    };
    const handleTypeChange = (newType) => {
        setCurrentFilters({
            currentGen: currentFilters.currentGen,
            currentType: newType,
            threeDSprites: currentFilters.threeDSprites,
        });
        setCurrentPage(1);
    };
    const handleSpritesChange = (changedThreeDSprites) => {
        setCurrentFilters({
            currentGen: currentFilters.currentGen,
            currentType: currentFilters.currentType,
            threeDSprites: changedThreeDSprites,
        });
    };

    return (
        <div>
            <h1 className='header'>Pokédex</h1>
            <div>
                <FilterRow onGenChange={handleGenChange} onTypeChange={handleTypeChange} onSpriteChange={handleSpritesChange} />
            </div>
            <div>
                <PokemonList currentPage={currentPage} currentFilters={currentFilters} onTotalPagesChange={handleTotalPagesChange} />
            </div>
            <div>
                <PageNavigation currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
            <h1 className='bottom-header'>Info</h1>
        </div>
    );
};

export default MainScreen;
