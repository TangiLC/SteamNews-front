import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/index.css';
import NewsList from '../components/NewsList';
import NewsArticle from '../components/NewsArticle';
import Loader from '../components/Loader';


function TestPage(){

return(
    <div>
    <Loader />
    <p>THIS IS A TEST</p>
    </div>
  
)}

export default TestPage;