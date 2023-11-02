// src/pages/TrendingPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { useParams } from 'react-router-dom';

function TrendingPage () {
  const [articles, setArticles] = useState([]);
  const { country } = useParams();

  useEffect(() => {
    const fetchTrendingArticles = async () => {
      try {
        const response = await axios.get(`https://api.newsmuncher.com/api/trending/${country}/`);
        setArticles(response.data.results);
      } catch (error) {
        console.error("Error fetching trending articles:", error);
      }
    };

    fetchTrendingArticles();
  }, [country]);


  return (
    <div className="container mx-auto px-4 pt-6">
      <h2 className="text-2xl mb-4 font-bold text-blue-700">Trending Articles</h2>
      <div className="card-container overflow-y-scroll hide-scrollbar">
        {articles.map(article => (
          <div className="card-wrapper">
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
      </div>
    </div>
  );
}
export default TrendingPage;
