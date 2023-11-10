// src/pages/LatestArticlesPages.js
import { React, useRef }  from 'react';
import { useParams } from 'react-router-dom';
import useArticleFetcher from '../hooks/useArticleFetcher';
import Card from '../components/Card';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useKeyboardNavigation from '../hooks/useKeyboardNavigation';

function LatestArticles() {
  const { country } = useParams();
  const apiEndpoint = `https://api.newsmuncher.com/api/articles/${country}`;
  const { articles, isFetching, loadMoreData } = useArticleFetcher(apiEndpoint);
  const scrollRef = useRef(null);
  
  useKeyboardNavigation(scrollRef);
  useInfiniteScroll(scrollRef, loadMoreData);

  return (
    <div className="w-full">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-700">Latest Articles</h2>
        </div>
      <div ref={scrollRef} className="card-container-vertical">
        {articles.map(article => (
          <div key={article.guid} className="card-wrapper-vertical">
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
        {isFetching && <p></p>}
      </div>
    </div>
  );
}

export default LatestArticles;
