import logo from './assets/logo.svg';
import './styles/App.css';
import React, { Fragment } from "react";
import "./index.css";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NewsPage from './pages/NewsPage';
import SearchPage from './pages/SearchPage';
import ArticlePage from './pages/ArticlePage';
import GamePage from './pages/GamePage';




/*function App() {
  return (
    <Router>
      <main> 
        <nav>  
          <ul>   
            <li>   
              <link to="./pages/NewsPage">News</link>
            </li>
            <li>
              <link to="./pages/SearchPage">Search</link>
            </li>
            <li>
              <link to="./pages/ArticlePage">Article</link>
            </li>
            <li>
              <link to="./pages/GamePage">Game</link>
            </li>
          </ul>
        </nav>
        <switch>
        <Route path="./pages/NewsPage" component={NewsPage} />
        <Route path="./pages/SearchPage" component={SearchPage} />
        <Route path="./pages/ArticlePage" component={ArticlePage} />
        <Route path="./pages/GamePage" component={GamePage} />
        <Route render={() => <h1>404: page not found</h1>} />
        </switch>
      </main>
    </Router>
  );
}*/

function App (){}

export default App;
