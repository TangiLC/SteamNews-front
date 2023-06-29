import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import '../styles/HeaderMenu.css';

import newsSvg from '../assets/news.svg'
import gameSvg from '../assets/game.svg'
import searchSvg from '../assets/search.svg'
import articleSvg from '../assets/article.svg'

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
      <div className="logo">Logo</div>

      <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <nav>
      <ul className={`menu-items ${menuOpen ? 'open' : ''}`}>
        <li className={activePage === 'NewsPage' ? 'active' : ''}>
        <link to="/NewsPage">
          <img src={newsSvg} alt="news" className="menu-img" />
          News
          </link>
        </li>
        <li className={activePage === 'ArticlePage' ? 'active' : ''}>
          <link to="/ArticlePage">
          <img src={articleSvg} alt="article" className="menu-img" />
          Article
          </link>
        </li>
        <li className={activePage === 'GamePage' ? 'active' : ''}>
        <link to="/GamePage">
          <img src={gameSvg} alt="game" className="menu-img" />
          Game
          </link>
        </li>
        <li className={activePage === 'SearchPage' ? 'active' : ''}>          
        <link to="/SearchPage">
          <img src={searchSvg} alt="search" className="menu-img" />
          Search
          </link>
        </li>
      </ul>
      </nav>
    </div>
 


);
};


export default HeaderMenu;
