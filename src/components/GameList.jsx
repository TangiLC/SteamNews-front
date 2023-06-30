import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import '../styles/GameList.css';

import GamePage from '../pages/GamePage';
import { SearchQuery } from '../App';
import Loader from '../components/Loader.jsx'



const SearchList = () => {
  const [newsList, setNewsList] = useState([]);
  const [activePage, setActivePage] = useState([]);
  let query = useParams();
  let gameId=0;
  let gameName='NO GAME selected, please search';
  if (query.appId!==undefined){
    gameId = query.appId.valueOf().split('|')[0];
    gameName = query.appId.valueOf().split('|')[1];}
  
  
  const navigate = useNavigate();
  
    const handlePageChange = (appId,appName) => {
      let gameName = appName.replaceAll(' ','&#160;');
      let param = appId+'|'+gameName;
      navigate(`/GamePage/${encodeURIComponent(param)}`);
}

const [isLoading, setIsLoading] = useState(false);
useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
      let queryUrl=`http://localhost:3000/v1/games/${gameId}/news`;    
			await fetch(queryUrl)
				.then((response) => response.json())
				.then((data) => setNewsList(data), setIsLoading(false))
        .catch(error => console.log("erreur de fetch :",error))
		}
		fetchData();
	}, [query,gameId,newsList]);
  
  let errorMssg='';
  if(newsList.length===0){errorMssg='(Ծ︵Ծ) NO NEWS FOUND'}

  function formatDate(millisecEpoch) {
    return new Date(millisecEpoch).toLocaleDateString();
  }

  function processImg(url){
    if (url[0]==='y'){return (`<iframe src='${url.substring(2)}?&autoplay=1&mute=1'></iframe>`)}
    else {return (`<img src='${url}' alt='game'>`)}
  }

  return (<div>
    {isLoading ? (<Loader />
    ):(
      <div>
        <h1>News about <span dangerouslySetInnerHTML={{ __html: gameName}}/></h1>
        {errorMssg !== "" && <h2>{errorMssg}</h2>}
      <div className="article-game">
      
      {newsList.news && newsList.news.map((gameNews) => (
        <div className="game-item" key={gameNews.appid+gameNews.date} onClick={() => handlePageChange(gameNews.appid,gameName)}>
          <div className="game-header">
            <h2 className="game-title">{gameNews.title}</h2>
            <div className="game-date">
              <div>&#91;{gameNews.author}&#93;</div>
              <div>{formatDate(gameNews.date*1000)}</div>
            </div>
          </div>
          <div className="game-content" dangerouslySetInnerHTML={ { __html: gameNews.contents}}></div>
          <div className="game-img">{gameNews.images.map((img) => (
            <span className ='bottomImg' dangerouslySetInnerHTML={{ __html: processImg(img)}}/>)
          )}  </div>
        </div>
        
      ))}
    </div></div>
  )}</div>)
};

export default SearchList;
