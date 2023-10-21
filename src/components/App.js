import '../css/style.css'
import React from 'react';
import MainScreen from './main_Screen/MainScreen'
import { Router, Route, Link } from 'react-router-dom';
import InfoScreen from './info_Screen/PokemonImage';

const NUMOF_GEN_123_POKEMON = 386;

const App = () => {
  return (
    <>
    <MainScreen />
    </>
  );
};

export default App;