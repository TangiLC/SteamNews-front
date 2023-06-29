import React, { useEffect, useState } from 'react';
import '../styles/LatestNews.css';

import GamePage from '../pages/GamePage';


const LatestNews = () => {
  const [miniNewsList, setMiniNewsList] = useState([]);
  const [activePage, setActivePage] = useState([]);
    const handlePageChange = (page) => {
    setActivePage(page);
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
    <div><h1>Latest News of the week</h1>
    <div className="latest-news">
      
      {miniNewsList && miniNewsList.map((miniNews) => (
        <div className="news-item" key={miniNews.appid+miniNews.date} onClick={() => handlePageChange('GamePage')}>
          <div className="news-header">
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
