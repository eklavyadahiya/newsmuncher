// src/pages/TrendingPage.js
import { React }  from 'react';
import { useParams } from 'react-router-dom';
import useArticleFetcher from '../hooks/useArticleFetcher';
import Card from '../components/Card';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

function TrendingPage() {
  const { country } = useParams();
  const apiEndpoint = `https://api.newsmuncher.com/api/trending/${country}`;

  const { articles, isFetching, loadMoreData } = useArticleFetcher(apiEndpoint);
  
  useInfiniteScroll(loadMoreData);

  return (
    <div className="w-full">
      <div className="text-center">
        <h2 className="page-heading text-2xl font-bold text-blue-700">Trending</h2>
        </div>
      
      <div className="card-container-vertical">
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

export default TrendingPage;
