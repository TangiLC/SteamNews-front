import React from 'react';
import '../styles/ArticleList.css';


const PrevNext = (data) =>{

    function formatDate(millisecEpoch) {
        return new Date(millisecEpoch).toLocaleDateString();
    }

return(
    <div className="news-item" key={data.appid + data.date}>
        <div className="news-header">
            <h3 className="news-index">±</h3>
            <h2 className="news-name">{data.appName}</h2>
            <div className="news-date">
                <div>&#91;{data.author}&#93;</div>
                <div>{formatDate(data.date * 1000)}</div>
            </div>
        </div>
    <div className="news-title">{data.title}</div>
    </div>
                        
)}

export default PrevNext;