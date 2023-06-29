import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/index.css';
import SearchForm from '../components/SearchForm';
import HeaderMenu from '../components/HeaderMenu';
import SearchList from '../components/SearchList';

function SearchPage(){

return(
    <div>
      <SearchForm />
      <SearchList />
    </div>
    
    
)}

export default SearchPage;