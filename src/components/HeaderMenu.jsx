import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import '../styles/HeaderMenu.css';

import newsSvg from '../assets/news.svg'
import gameSvg from '../assets/game.svg'
import searchSvg from '../assets/search.svg'
import articleSvg from '../assets/article.svg'

import logo from '../assets/logo.png';
import NewsPage from '../pages/NewsPage';
import ArticlePage from '../pages/ArticlePage';
import GamePage from '../pages/GamePage';
import SearchPage from '../pages/SearchPage';


function HeaderMenu (activePg) {
  const [activePage, setActivePage] = useState(activePg);
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePageChange = (page) => {
    setActivePage(page);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header-menu">
      <div className="logo"><img src={logo} alt="logo"/></div>

      <nav>
      <div className={`menu-items ${menuOpen ? 'open' : ''}`}>
        
        <div className={activePage === 'NewsPage' ? 'active' : ''}>
        
          <img src={newsSvg} alt="news" className="menu-img" />
          <Link to="/NewsPage">News
          </Link>
        </div>
        <div className={activePage === 'ArticlePage' ? 'active' : ''}>
          
          <img src={articleSvg} alt="article" className="menu-img" />
          <Link to="/ArticlePage/1">Article
          </Link>
        </div>
        <div className={activePage === 'GamePage' ? 'active' : ''}>
        
          <img src={gameSvg} alt="game" className="menu-img" />
          <Link to="/GamePage">Game
          </Link>
        </div>
        <div className={activePage === 'SearchPage' ? 'active' : ''}>          
        
          <img src={searchSvg} alt="search" className="menu-img" />
          <Link to="/SearchPage/search">Search
          </Link>
        </div>
        
      </div>
      </nav>
      <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
 


);
};


export default HeaderMenu;
