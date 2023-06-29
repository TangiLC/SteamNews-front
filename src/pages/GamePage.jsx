import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/index.css';
import NewsList from '../components/NewsList';
import GameList from '../components/GameList';
import SearchForm from '../components/SearchForm';



function GamePage(){

return(
    <div>
    <SearchForm />
    
    <GameList />
    </div>
    
)}

export default GamePage;