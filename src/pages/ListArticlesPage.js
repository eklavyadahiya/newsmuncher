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

  // Determine the API endpoint based on pageType
  if (pageType === 'trending') {
    apiEndpoint = `https://api.newsmuncher.com/api/trending/${country}`;
  } else if (pageType === 'latest') {
    apiEndpoint = `https://api.newsmuncher.com/api/articles/${country}`;
  } else if (pageType === 'tag') {
    apiEndpoint = `https://api.newsmuncher.com/api/articles/${country}/tag/${tag}`;
  }

  const { articles, loadMoreData } = useArticleFetcher(apiEndpoint);
  const dispatch = useDispatch();
  const lastArticleId = useSelector(state => state.lastArticleId.lastArticleId);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useInfiniteScroll(loadMoreData);

  // Selector for getting the relevant articles based on pageType
  const storedArticles = useSelector(state => {
    if (pageType === 'trending') {
      return state.articles.trending;
    } else if (pageType === 'latest') {
      return state.articles.latest;
    } else if (pageType === 'tag') {
      return state.articles.tags[tag] || [];
    }
  });

  useEffect(() => {
    if (articles.length > 0) {
      dispatch(appendArticles({ pageType, articles }));
    }
  }, [articles, dispatch, pageType]);

  useEffect(() => {
    const lastArticleElement = document.getElementById(lastArticleId);
    if (lastArticleElement && isInitialLoad) {
      lastArticleElement.scrollIntoView();
      setIsInitialLoad(false);
    }
  }, [lastArticleId, isInitialLoad]);

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

export default ListArticlesPage;
