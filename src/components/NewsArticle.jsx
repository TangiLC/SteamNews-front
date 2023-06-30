import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import '../styles/GameList.css';

import GamePage from '../pages/GamePage';
import { SearchQuery } from '../App';
import Loader from '../components/Loader.jsx'
import articleSvg from '../assets/article.svg'
import LeftArrow from '../assets/leftArrow.svg'
import RightArrow from '../assets/rightArrow.svg'



const NewsArticle = () => {
  const navigate = useNavigate();
  let query = useParams();
  let articleIndex =parseInt(query.articleNb.valueOf());
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

const [isLoading, setIsLoading] = useState(true);
const [articleList, setArticleList] = useState('');
useEffect(() => {
    async function fetchArticle() {
        await fetch("http://localhost:3000/v1/news/")
            .then((response) => response.json())
            .then((data) => setArticleList(data.news), setIsLoading(false))
    .catch(error => console.log("erreur de fetch :",error))
    }
    fetchArticle();  
    console.log('useEffect lancé');  
  },[]);
  
  let errorMssg='';
  if(articleList.length===0){errorMssg='(Ծ︵Ծ) NO NEWS FOUND'}

  function formatDate(millisecEpoch) {
    return new Date(millisecEpoch).toLocaleDateString();
  }

  function processImg(url){
    if (url[0]==='y'){return (`<iframe src='${url.substring(2)}?&autoplay=1&mute=1'></iframe>`)}
    else {return (`<img src='${url}' alt='game'>`)}
  }

  function showArticle(newsNb){
    if (isLoading){return(<div><Loader /></div>)}
    else {
    let prev; let nxt;
    (newsNb===0)?prev=articleList.length-1:prev=newsNb-1;
    (newsNb===articleList.length-1)?nxt=0:nxt=newsNb+1;

    let myList=[]
    myList.push(articleList[prev]);
    myList.push(articleList[newsNb]);
    myList.push(articleList[nxt]);
    console.log(myList);

    return(
        <div className="news-item" key={myList[1].appid+myList[1].date} onClick={() => handlePageChange(myList[1].appId,myList[1].appName)}>
          <div className="news-header"><h3 className="news-index">{newsNb}</h3>
            <h2 className="news-name">{myList[1].appName}</h2>
            <div className="news-date">
                <div>&#91;{myList[1].author}&#93;</div>
                <div>{formatDate(myList[1].date*1000)}</div>
            </div>
          </div>
          <div className="news-title">{myList[1].title}</div>
          <div className="news-content" dangerouslySetInnerHTML={{ __html: myList[1].contents}}></div>
          <div className="game-img">{myList[1].images.map((img) => (
            <span className ='bottomImg' dangerouslySetInnerHTML={{ __html: processImg(img)}}/>)
          )}  </div>
        </div>)}
    }
 
return (  
    <div>
        <h1>Latest News of The Week</h1>
        {errorMssg !== "" && <h2>{errorMssg}</h2>}
        <div className="article-game">
            {showArticle(articleIndex)}
        </div>
        <div className="article-footer">
            <div className="article-prevNext">
                <div><img src={LeftArrow} alt="previous" className="article-svg" /></div>
                <div className="prevNext-content">

                </div>
            </div>
            <div className="article-svg">
                <img src={articleSvg} alt="article" className="article-svg" /></div>
            <div className="article-prevNext">
                <div className="prevNext-content">

                </div>
                <div><img src={RightArrow} alt="next" className="article-svg" /></div>
            </div>
        </div>
    </div>
    
  )
}

export default NewsArticle;
