import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import '../styles/GameList.css';

import GamePage from '../pages/GamePage';
import { SearchQuery } from '../App';
import Loader from '../components/Loader.jsx'



const NewsArticle = () => {
  const navigate = useNavigate();
  let query = useParams();
  let articleIndex =parseInt(query.query.valueOf());
  console.log("Article index",articleIndex)
  if(articleIndex ===undefined){articleIndex =0}
  
  
 const handlePageChange = (appId,appName) => {
    let gameName = appName.replaceAll(' ','&#160;');
    let param = appId+'|'+gameName;
    navigate(`/GamePage/${encodeURIComponent(param)}`);
}

const handleArticleChange = (param) => {
    navigate(`/ArticlePage/${encodeURIComponent(param)}`);
}

const [articleList, setArticleList] = useState([]);
useEffect(() => {
    console.log('useEffect lancé');    
    fetch("http://localhost:3000/v1/news/")
    .then(response => response.json())
    .then(data => {
        setArticleList(data.news);
        console.log('A',articleList);
     })
    .catch(error => console.log("erreur de fetch :",error))

  },[articleList]);
  
  let errorMssg='';
  if(articleList.length===0){errorMssg='(Ծ︵Ծ) NO NEWS FOUND'}

  function formatDate(millisecEpoch) {
    return new Date(millisecEpoch).toLocaleDateString();
  }

  function processImg(url){
    if (url[0]==='y'){return (`<iframe src='${url.substring(2)}?&autoplay=1&mute=1'></iframe>`)}
    else {return (`<img src='${url}' alt='game'>`)}
  }

  function showArticle(myList,newsNb){
    let article=myList[newsNb];
    return(
        <div className="news-item" key={article.appid+article.date} onClick={() => handlePageChange(article.appId,article.appName)}>
          <div className="news-header"><h3 className="news-index">{newsNb}</h3>
            <h2 className="news-name">{article.appName}</h2>
            <div className="news-date">
                <div>&#91;{article.author}&#93;</div>
                <div>{formatDate(article.date*1000)}</div>
            </div>
          </div>
          <div className="news-title">{article.title}</div>
          <div className="news-content" dangerouslySetInnerHTML={ { __html: article.contents}}></div>
          <div className="game-img">{article.images.map((img) => (
            <span className ='bottomImg' dangerouslySetInnerHTML={{ __html: processImg(img)}}/>)
          )}  </div>
        </div>
      )}


 

  return (
      <div>
        <h1>Latest News of The Week</h1>
        {errorMssg !== "" && <h2>{errorMssg}</h2>}
        <div className="article-game">
            {console.log(articleList[articleIndex])}
            {showArticle(articleList,articleIndex)}
        </div>
    </div>
  )
};

export default NewsArticle;
