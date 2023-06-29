import React from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import './styles/index.css';

import HeaderMenu from './components/HeaderMenu';
import SearchForm from './components/SearchBar';
import App from './App.js'

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NewsPage from './pages/NewsPage';
import SearchPage from './pages/SearchPage';
import ArticlePage from './pages/ArticlePage';
import GamePage from './pages/GamePage';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
      <Router>
        <HeaderMenu />
        <SearchForm />
        
        <App/>
  
      </Router>
  </React.StrictMode>,
document.getElementById('root')
)
