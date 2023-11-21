import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appendArticles } from '../reducers/articlesSlice';
import { setLastArticleId } from '../reducers/lastArticleIdSlice';
import useArticleFetcher from '../hooks/useArticleFetcher';
import Card from '../components/Card';
import useInfiniteScroll from '../hooks/useInfiniteScroll';


function ListArticlesPage({ pageType }) {
  const { country, tag } = useParams();
  let apiEndpoint;
  let pageTitle;
  
  if (pageType === 'trending') {
    apiEndpoint = `https://api.newsmuncher.com/api/trending/${country}`;
    pageTitle = "Trending Articles"
  } else if (pageType === 'latest') {
    apiEndpoint = `https://api.newsmuncher.com/api/articles/${country}`;
    pageTitle = "What's happening in India"
  } else if (pageType === 'tag') {
    apiEndpoint = `https://api.newsmuncher.com/api/tags/${country}/`;
    pageTitle = `Articles for tag ${tag}`;
  }

  const { articles, loadMoreData } = useArticleFetcher(apiEndpoint, pageType, tag);
  const [navigationSource, setNavigationSource] = useState(null);
  const dispatch = useDispatch();
  const lastArticleId = useSelector(state => state.lastArticleId.lastArticleId);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useInfiniteScroll(loadMoreData);
  
  const trendingArticles = useSelector(state => state.articles.trending);
  const latestArticles = useSelector(state => state.articles.latest);
  const tagArticles = useSelector(state => state.articles.tags[tag]);

    let storedArticles;
    switch (pageType) {
      case 'trending':
        storedArticles = trendingArticles;
        break;
      case 'latest':
        storedArticles = latestArticles;
        break;
      case 'tag':
        storedArticles = tagArticles || [];
        break;
}

  useEffect(() => {
  if (articles.length > 0 && pageType === 'tag') {
    dispatch(appendArticles({ pageType, articles, tag }));
  } else if (articles.length > 0) {
    dispatch(appendArticles({ pageType, articles }));
  }
}, [articles, dispatch, pageType, tag]);

  useEffect(() => {
    const lastArticleElement = document.getElementById(lastArticleId);
    if (lastArticleElement && isInitialLoad) {
      lastArticleElement.scrollIntoView();
      setIsInitialLoad(false);
    }
  }, [lastArticleId, isInitialLoad]);
  
  useEffect(() => {
    if (pageType === 'tag' && navigationSource == 'tagClick') {
      const root = document.getElementById('main');
      root.style.display = 'none';

      const nav = document.getElementById('nav');
      setTimeout(() => {
        nav.scrollIntoView();root.style.display = '';}, 1000);
        
    }
  }, [pageType, navigationSource]);
 
  return (
    <div id="main" className="card-container-vertical" > 
    <div className="text-center"><h2 className="text-2xl font-bold text-gray-800 pt-4 pageTitle">{pageTitle ? (pageTitle) : ''} </h2></div>
      {storedArticles.map(article => (
        <div 
          key={article.guid} 
          id={article.guid} 
          className="card-wrapper-vertical"
          onClick={() => dispatch(setLastArticleId(article.guid))}
        >
          <Card 
            setNavigationSource={setNavigationSource}
            country={country}
            title={article.title} 
            image={article.top_image} 
            summary={article.clean_summary}
            guid={article.guid}
            date={article.publish_date}
            publisher={article.site}
            parent_url={article.url}
            tags={article.tags}
          />
        </div>
      ))}
    </div>
  );
}

export default ListArticlesPage;
