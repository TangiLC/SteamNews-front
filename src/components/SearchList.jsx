import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import '../styles/LatestNews.css';

import GamePage from '../pages/GamePage';
import { SearchQuery } from '../App';



const SearchList = () => {
  const [queryList, setQueryList] = useState([]);
  const [activePage, setActivePage] = useState([]);
  let query = useParams();
  const navigate = useNavigate();
  
  const handlePageChange = (appId,appName) => {
    let gameName = appName.replaceAll(' ','&#160;');
    let param = appId+'|'+gameName;
    navigate(`/GamePage/${encodeURIComponent(param)}`);
}

  useEffect(() => {
    let queryUrl='http://localhost:3000/v1/games?search='+query.query.valueOf();    
    
    fetch(queryUrl)
    .then(response => response.json())
    .then(data => {
        setQueryList(data.games);
        
     })
    .catch(error => console.log("erreur de fetch :",error))

  }, [query,queryList]);
  let errorMssg='';
  if(queryList.length===0){errorMssg='(Ծ︵Ծ) NO GAME FOUND'}

  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: `List of Games' Name containing "${query.query.valueOf()}" : (${queryList.length})` }}></h1>
      {errorMssg !== "" && <h2>{errorMssg}</h2>}
    <div className="latest-news">
      
      {queryList && queryList.map((game) => (
        <div className="news-item" key={game.appid} onClick={() => handlePageChange(game.appid,game.name)}>
          <div className="news-header">
            <h2 className="news-name">{game.name}</h2>
            <p className="news-date">{game.appid}</p>
          </div>
        </div> 
      ))}
    </div></div>
  );
};

export default SearchList;
