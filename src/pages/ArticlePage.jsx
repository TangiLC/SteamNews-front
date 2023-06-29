import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/index.css';
import NewsList from '../components/NewsList';
import NewsArticle from '../components/NewsArticle';
import SearchForm from '../components/SearchForm';


function ArticlePage(){

return(
    <div>
    <SearchForm />
    <NewsArticle />
    </div>
  
)}

export default ArticlePage;