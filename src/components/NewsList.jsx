import React, { useEffect, useState } from 'react';
import '../styles/LatestNews.css';


const LatestNews = () => {
  const [miniNewsList, setMiniNewsList] = useState([]);

  useEffect(() => {
        
    fetch("http://localhost:3000/v1/news/miniature")
    .then(response => response.json())
    .then(data => {
        setMiniNewsList(data.miniatures);
        console.log(data.miniatures);
        console.log(miniNewsList);
     })
    .catch(error => console.log("erreur de fetch :",error))

  }, []);

  return (
    <div className="latest-news">
      <h2>Latest News of the week</h2>
      {miniNewsList && miniNewsList.map((miniNews) => (
        <div className="news-item" key={miniNews.appid+miniNews.date}>
          <h3 className="news-name">{miniNews.appName}</h3>
          <p className="news-date">Date : {miniNews.date}</p>
          <div className="news-content" dangerouslySetInnerHTML={ { __html: miniNews.contents}}></div>
        </div> 
      ))}
    </div>
  );
};

export default LatestNews;
