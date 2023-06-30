import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import '../styles/ArticleList.css';

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

  async function createList(newsNb){
    await new Promise(resolve => setTimeout(resolve, 9000))
    .then(() =>{
        
    let prev; let nxt;
    (newsNb===0)?prev=articleList.length-1:prev=newsNb-1;
    (newsNb===articleList.length-1)?nxt=0:nxt=newsNb+1;

    let myList=[]
    myList.push(articleList[prev]);
    myList.push(articleList[newsNb]);
    myList.push(articleList[nxt]);
    console.log(myList);
    return myList;
    })
    
    }

function showArticle(index){
    let article=createList(index)[1];
    
    return(<>
        {(article===undefined)?(<div><Loader /></div>):(
        <div className="news-item" key={article.appid+article.date} onClick={() => handlePageChange(article.appId,article.appName)}>
          <div className="news-header"><h3 className="news-index">{index}</h3>
            <h2 className="news-name">{article.appName}</h2>
            <div className="news-date">
                <div>&#91;{article.author}&#93;</div>
                <div>{formatDate(article.date*1000)}</div>
            </div>
          </div>
          <div className="news-title">{article.title}</div>
          <div className="news-content" dangerouslySetInnerHTML={{ __html: article.contents}}></div>
          <div className="game-img">{article.images.map((img) => (
            <span className ='bottomImg' dangerouslySetInnerHTML={{ __html: processImg(img)}}/>)
          )}  </div>
        </div>)}</>
    )
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
                    PREVIOUS
                </div>
            </div>
            <div className="article-svg">
                <img src={articleSvg} alt="article" className="article-svg" /></div>
            <div className="article-prevNext">
                <div className="prevNext-content">
                    NEXT
                </div>
                <div><img src={RightArrow} alt="next" className="article-svg" /></div>
            </div>
        </div>
    </div>
    
  )
}

export default NewsArticle;
