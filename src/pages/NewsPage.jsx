import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/index.css';
import NewsList from '../components/NewsList';
import SearchForm from '../components/SearchForm';


function NewsPage(){

return(

    <div>
      <SearchForm />
      <NewsList />
    </div>
    
    
  
)}

export default NewsPage;