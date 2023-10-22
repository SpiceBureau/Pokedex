import '../../css/style.css';
import PokemonList from './PokemonList';
import React, { useState } from 'react';
import PageNavigation from './PageNavigation';
import FilterRow from './FilterRow';

const NUM_OF_POKEMON = 1010;

const MainScreen = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(Math.floor((NUM_OF_POKEMON / 50) + 1));
    const [currentGen, setCurrentGen] = useState("All");
    const [currentType, setCurrentType] = useState("All");
    const [threeDSprites, setThreeDSprites] = useState(false);

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
        setCurrentGen(newGen);
        setCurrentPage(1);
    };
    const handleTypeChange = (newType) => {
        setCurrentType(newType);
        setCurrentPage(1);
    };
    const handleSpritesChange = (changedThreeDSprites) => {
        setThreeDSprites(changedThreeDSprites);
    };

    return (
        <div>
            <h1 className='header'>Pokedex</h1>
            <div>
                <FilterRow onGenChange={handleGenChange} onTypeChange={handleTypeChange} onSpriteChange={handleSpritesChange} />
            </div>
            <div>
                <PokemonList currentPage={currentPage} currentGen={currentGen} currentType={currentType} onTotalPagesChange={handleTotalPagesChange} threeDSprites={threeDSprites} />
            </div>
            <div>
                <PageNavigation currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
            <h1 className='bottom-header'>Info</h1>
        </div>
    );
};

export default MainScreen;
