
import './styles/App.css';
import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/index.css";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NewsPage from './pages/NewsPage';
import SearchPage from './pages/SearchPage';
import ArticlePage from './pages/ArticlePage';
import GamePage from './pages/GamePage';
import TestPage from './pages/TestPage';

function SearchQuery(){
  return useParams();
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<NewsPage />} />
      <Route path="/NewsPage" element={<NewsPage />} />
      <Route path="/SearchPage" element={<SearchPage />} />
      <Route path="/SearchPage/:query" element ={<SearchPage />} />
      <Route path="/ArticlePage" element={<ArticlePage />} />
      <Route path="/ArticlePage/:articleNb" element={<ArticlePage />} />
      <Route path="/GamePage" element={<GamePage />} />
      <Route path="/GamePage/:appId" element ={<GamePage />} />
      <Route path="/test" element={<TestPage />} />
              
    </Routes>
  );
}

export default App;
export {SearchQuery};
