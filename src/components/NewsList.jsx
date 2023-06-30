import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import '../styles/LatestNews.css';

import GamePage from '../pages/GamePage';


const LatestNews = () => {
  const [miniNewsList, setMiniNewsList] = useState([]);
  const [activePage, setActivePage] = useState([]);

  const navigate = useNavigate();

  const handlePageChange = (param) => {
    navigate(`/ArticlePage/${encodeURIComponent(param)}`);
}

  useEffect(() => {
        
    fetch("http://localhost:3000/v1/news/miniature")
    .then(response => response.json())
    .then(data => {
        setMiniNewsList(data.miniatures);
        console.log(data.miniatures);
        console.log(miniNewsList);
     })
    .catch(error => console.log("erreur de fetch :",error))

  }, [miniNewsList]);

    function formatDate(millisecEpoch) {
        return new Date(millisecEpoch).toLocaleDateString();
    }

  return (
    <div><h1>Latest News of The Week</h1>
    <div className="latest-news">
      
      {miniNewsList && miniNewsList.map((miniNews,index) => (
        <div className="news-item" key={miniNews.appid+miniNews.date} onClick={() => handlePageChange(index)}>
          <div className="news-header"><h3 className="news-index">{index}</h3>
            <h2 className="news-name">{miniNews.appName}</h2>
            <p className="news-date">{formatDate(miniNews.date*1000)}</p>
          </div>
          <div className="news-title">{miniNews.title}</div>
          <div className="news-content" dangerouslySetInnerHTML={ { __html: miniNews.contents}}></div>
        </div> 
      ))}
    </div></div>
  );
};

export default LatestNews;
