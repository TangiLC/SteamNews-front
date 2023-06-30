import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ArticleList.css';

import GamePage from '../pages/GamePage';
import { SearchQuery } from '../App';
import PrevNext from './PrevNext';
import Loader from '../components/Loader.jsx';
import articleSvg from '../assets/article.svg';
import LeftArrow from '../assets/leftArrow.svg';
import RightArrow from '../assets/rightArrow.svg';

const NewsArticle = () => {             //display full article and previous/next abstract
    const navigate = useNavigate();
    let query = useParams();
    let articleIndex = parseInt(query.articleNb.valueOf());
    console.log('Article index', articleIndex);
    if (articleIndex === undefined) {
        articleIndex = 0;
    }
        
    const [isLoaded, setIsLoaded] = useState(false);
    const [articleList, setArticleList] = useState('');    //fetch the full articles array
    useEffect(() => {
        async function fetchArticle() {
            await fetch('http://localhost:3000/v1/news/')
                .then((response) => response.json())
                .then((data) => setArticleList(data.news), setIsLoaded(true))
                .catch((error) => console.log('erreur de fetch :', error));
        }
        fetchArticle();
        console.log('useEffect lancé');
    }, [articleList]);

    const [articlePrevious, setArticlePrevious] = useState();
    useEffect(() => {
        setArticlePrevious(articleIndex-1)
        if (articlePrevious<0){setArticlePrevious(articleList.length-1)}
    },[articleIndex,articleList.length,articlePrevious]);

    const [articleNext, setArticleNext] = useState();
    useEffect(() => {
        setArticleNext(articleIndex+1)
        if (articleNext>=articleList.length){setArticlePrevious(0)}
    },[articleIndex,articleList.length,articleNext]);


    const handlePageChange = (appId, appName) => {        //reroute to Game page on click
        let gameName = appName.replaceAll(' ', '&#160;');
        let param = appId + '|' + gameName;
        navigate(`/GamePage/${encodeURIComponent(param)}`);
    };

    const handleArticleChange = (param) => {            //display previous or next in full (carrousel)
        if (param===-1) {param=articleList.length-1}
        if (param===articleList.length) {param=0} 
        articleIndex=param;
        navigate(`/ArticlePage/${encodeURIComponent(articleIndex)}`);
    };

    
    let errorMssg = '';
    if (articleList.length === 0) {
        errorMssg = '(Ծ︵Ծ) NO NEWS FOUND';
    }

    function formatDate(millisecEpoch) {                //convert ms epoch date to ddmmyyyy
        return new Date(millisecEpoch).toLocaleDateString();
    }

    function processImg(url) {                          //display img or ytube 
        if (url[0] === 'y') {
            return `<iframe src='${url.substring(
                2
            )}?&autoplay=1&mute=1'></iframe>`;
        } else {
            return `<img src='${url}' alt='game'>`;
        }
    }
    
    const showArticle = (article) =>{
        
        //let article = articles[1];
        article={'appid':0,'appName':'TEST','contents':'Lorem ipsum...','date':123456789,'author':'test','title':'A Test Here','images':[]}

        return (
            <>
                {(article === undefined) ? (
                    <div>
                        <Loader />
                    </div>
                ) : (
                    <div
                        className="article-item"
                        key={article.appid + article.date}
                        onClick={() =>
                            handlePageChange(article.appid, article.appName)
                        }
                    >
                        <div className="article-header">
                            <h3 className="article-index">N</h3>
                            <h2 className="article-name">{article.appName}</h2>
                            <div className="article-date">
                                <div>&#91;{article.author}&#93;</div>
                                <div>{formatDate(article.date * 1000)}</div>
                            </div>
                        </div>
                        <div className="article-title">{article.title}</div>
                        <div
                            className="article-content"
                            dangerouslySetInnerHTML={{
                                __html: article.contents,
                            }}
                        ></div>
                        <div className="game-img">
                            {article.images.map((img) => (
                                <span
                                    className="bottomImg"
                                    dangerouslySetInnerHTML={{
                                        __html: processImg(img),
                                    }}
                                />
                            ))}{' '}
                        </div>
                    </div>
                )}
            </>
        );
    }

    return (
        <div>
            <h1>Latest News of The Week</h1>
            {errorMssg !== '' && <h2>{errorMssg}</h2>}
            <div className="article-game">{showArticle(articleList[articleIndex])}</div>
            <div className="article-footer">
                <div className="article-prevNext" onClick={() => handleArticleChange(articleIndex-1)}>
                    <div className="left-arrow">
                        <img
                            src={LeftArrow}
                            alt="previous"
                            className="article-svg"
                        />
                    </div>
                    <div className="prevNext-content">{PrevNext(articleList[articlePrevious])}</div>
                </div>
                <div className="article-svg">
                    <img
                        src={articleSvg}
                        alt="article"
                        className="article-svg"
                    />
                </div>
                <div className="article-prevNext" onClick={() => handleArticleChange(articleIndex+1)}>
                    <div className="prevNext-content">{PrevNext(articleList[articleNext])}</div>
                    <div className="right-arrow">
                        <img
                            src={RightArrow}
                            alt="next"
                            className="article-svg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsArticle;
