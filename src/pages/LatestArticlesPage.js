import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appendArticles } from '../reducers/articlesSlice';
import { setLastArticleId } from '../reducers/lastArticleIdSlice';

import useArticleFetcher from '../hooks/useArticleFetcher';
import Card from '../components/Card';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

function LatestArticles() {
  const { country } = useParams();
  const apiEndpoint = `https://api.newsmuncher.com/api/articles/${country}`;
  const { articles, loadMoreData } = useArticleFetcher(apiEndpoint);
  const dispatch = useDispatch();
  const storedArticles = useSelector((state) => state.articles.articles);
  const lastArticleId = useSelector(state => state.lastArticleId.lastArticleId); // Moved here
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useInfiniteScroll(loadMoreData);

  useEffect(() => {
    if (articles.length > 0) {
      dispatch(appendArticles(articles));
    }
  }, [articles, dispatch]);

  useEffect(() => {
    const lastArticleElement = document.getElementById(lastArticleId);
    if (lastArticleElement && isInitialLoad) {
      lastArticleElement.scrollIntoView();
      setIsInitialLoad(false);
    }
  }, [storedArticles, lastArticleId, isInitialLoad]);

  return (
    <div className="card-container-vertical">
      {storedArticles.map(article => (
        <div 
          key={article.guid} 
          id={article.guid} 
          className="card-wrapper-vertical"
          onClick={() => dispatch(setLastArticleId(article.guid))}
        >
          <Card 
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

export default LatestArticles;
