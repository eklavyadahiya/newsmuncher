// src/pages/TrendingPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { useLocation, useParams } from 'react-router-dom';


function TrendingPage({ apiEndpoint }) {
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const { country, tag, article } = useParams();
  const [nextUrl, setNextUrl] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const getEndpointURL = () => {
    // Base URL for the API
    const baseUrl = 'https://api.newsmuncher.com/api/';
    let endpoint = '';
  
    switch (apiEndpoint) {
      case 'trending':
        endpoint = `${baseUrl}trending/${country}/`;
        break;
      case 'latest':
        endpoint = `${baseUrl}articles/${country}/`;
        break;
      case 'tag':
        endpoint = `${baseUrl}tags/${country}/tag/${tag}`;
        break;
      case 'article':
        endpoint = `${baseUrl}article/${article}`; // Assuming `article` param is the `guid`
        break;
      default:
        // Handle any other case or throw an error
        console.error(`Invalid API endpoint: ${apiEndpoint}`);
    }
  
    return endpoint;
  };
  
  const fetchTrendingArticles = async (url = getEndpointURL()) => {
    setIsFetching(true);
    try {
      const response = await axios.get(url);
  
      // Combine the current articles with the newly fetched ones
      const combinedArticles = [...articles, ...response.data.results];
      
      // Create a new Set to keep track of unique GUIDs
      const uniqueGUIDs = new Set();
      const uniqueArticles = combinedArticles.filter(article => {
        const isUnique = !uniqueGUIDs.has(article.guid);
        uniqueGUIDs.add(article.guid);
        return isUnique;
      });
  
      // Update the state with the unique articles
      setArticles(uniqueArticles);
  
      setNextUrl(response.data.next);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsFetching(false);
    }
  };
  
    // eslint-disable-next-line
  const loadMoreData = () => {
    if (nextUrl && !isFetching) {
      fetchTrendingArticles(nextUrl);
    }
  };

  useEffect(() => {
    fetchTrendingArticles();
  }, [country, apiEndpoint, tag, article]);

  useEffect(() => {
    const container = document.querySelector('.card-container-vertical');

    const handleScroll = () => {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 300 && !isFetching) {
        loadMoreData();
      }
    };

    container.addEventListener('scroll', handleScroll);

    return () => container.removeEventListener('scroll', handleScroll);
  }, [nextUrl, articles, isFetching]); 

  useEffect(() => {
    const handleKeyDown = (e) => {
      const container = document.querySelector('.card-container-vertical'); 
      const scrollAmount = window.innerHeight; 
  
      switch (e.keyCode) {
        case 37: // left arrow
        case 38: // up arrow
          container.scrollBy({
            top: -scrollAmount,
            behavior: 'smooth',
          });
          break;
        case 39: // right arrow
        case 40: // down arrow
          container.scrollBy({
            top: scrollAmount,
            behavior: 'smooth',
          });
          break;
        default:
          break;
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // Reset the state when the location changes
    setArticles([]);
    setNextUrl(null);
  
    // Optionally scroll to top
    window.scrollTo(0, 0);
  
    // Then fetch new articles
    fetchTrendingArticles();
  }, [location]); // Watch the entire location object

  return (
    <div className="h-screen w-full overflow-hidden">
      <h2 className="text-2xl mb-4 font-bold text-blue-700 absolute top-0 left-0">Trending Articles</h2>
      
      <div className="card-container-vertical hide-scrollbar overflow-y-scroll">
        {articles.map(article => (
          <div key={article.guid} className="card-wrapper-vertical hide-scrollbar">
            <Card 
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
        {isFetching && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default TrendingPage;
