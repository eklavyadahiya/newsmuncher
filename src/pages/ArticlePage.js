// src/pages/ArticlePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import TimelineCard from '../components/TimelineCard'
import { useParams } from 'react-router-dom';

function ArticlePage() {
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const { article: articleGuid } = useParams();

  const getEndpointURL = () => {
    return `https://api.newsmuncher.com/api/article/${articleGuid}`;
  };

  const fetchArticle = async () => {
    try {
      const url = getEndpointURL();
      const response = await axios.get(url);
      setArticle(response.data); // Set main article
  
      // Create a new Set to track unique GUIDs
      const uniqueGUIDs = new Set();
  
      // Filter the related array, adding only unique GUIDs to the set and array
      const filteredRelated = response.data.related
      ?.filter(ra => {
        const isUnique = !uniqueGUIDs.has(ra.guid);
        uniqueGUIDs.add(ra.guid);
        return isUnique;
      }) || [];
  
      setRelatedArticles(filteredRelated);
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };
  useEffect(() => {
    fetchArticle();
  }, [articleGuid]);
  // Handle horizontal scrolling
  useEffect(() => {
    const container = document.querySelector('.card-container');

    const handleScroll = () => {
      // Check if we're near the right edge of the container
      if (container.scrollWidth - (container.scrollLeft + container.clientWidth) < 100) {
      }
    };

    container.addEventListener('scroll', handleScroll);

    return () => container.removeEventListener('scroll', handleScroll);
  }, [relatedArticles]); // Re-run the effect when relatedArticles changes

  const calculateDaysBetween = (date1, date2) => {
    // One day in milliseconds
    const oneDay = 24 * 60 * 60 * 1000;
    // Convert both dates to milliseconds
    const date1Ms = new Date(date1).getTime();
    const date2Ms = new Date(date2).getTime();
    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1Ms - date2Ms);
    // Convert back to days and return
    return Math.round(differenceMs / oneDay);
  };

  
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow text-center">
        <h2 className="text-2xl mb-4 font-bold text-gray-800 p-4">Article Details</h2>
      </header>
      <main className="p-4">
        <section className="mb-8 p-4 bg-white rounded-lg shadow-lg">
          {article ? (
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
          ) : (
            <p>Loading...</p>
          )}
        </section>
        <section className="mb-8">
        <header className="bg-white shadow text-center">
        <h2 className="text-2xl mb-4 font-bold text-gray-800 p-4">Timeline</h2>
          </header>
          <div className="h-screen w-full overflow-hidden card-container hide-scrollbar overflow-x-scroll flex space-x-12">
            
            {relatedArticles.map((relatedArticle, index) => (
              <div key={relatedArticle.guid || index} className="flex-none w-60 card-wrapper horizontal-styles interactive-card">
                <TimelineCard 
                  title={relatedArticle.title} 
                  image={relatedArticle.top_image}
                  date={relatedArticle.publish_date}
                  summary={relatedArticle.clean_summary}
                  highlight={relatedArticle.guid === articleGuid}
                  guid={relatedArticle.guid}
                  horizontal={true}
                  publisher={relatedArticle.site}
                  parent_url={relatedArticle.url}
                  tags={relatedArticle.tags}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ArticlePage;