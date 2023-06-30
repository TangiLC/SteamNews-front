import React from 'react';
import '../styles/ArticleList.css';


const PrevNext = (datas) =>{

    datas={'appid':0,'appName':'PrevNext','contents':'Lorem ipsum...','date':123456789,'author':'test','title':'TestPrevNext','images':[]}
    function formatDate(millisecEpoch) {
        return new Date(millisecEpoch).toLocaleDateString();
    }

return(
    <div className="prevNext-item" key={datas.appid + datas.date}>
        <div className="article-header">
            <h3 className="article-index">±</h3>
            <h2 className="article-name">{datas.appName}</h2>
            <div>
                <div className="article-date">&#91;{datas.author}&#93;</div>
                <div className="article-date">{formatDate(datas.date * 1000)}</div>
            </div>
        </div>
        <div className="article-title">{datas.title}</div>
    </div>
                        
)}

export default PrevNext;