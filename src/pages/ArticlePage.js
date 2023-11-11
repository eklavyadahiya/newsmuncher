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

  useEffect(() => {
    const rootElement = document.getElementById('root');
    rootElement.scrollTo(0, 0);
  }, []);


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
      let filteredRelated = response.data.related
        ?.filter(ra => {
          const isUnique = !uniqueGUIDs.has(ra.guid);
          uniqueGUIDs.add(ra.guid);
          return isUnique;
        }) || [];
  
      // Sort the articles by publish_date in descending order
      filteredRelated = filteredRelated.sort((a, b) => {
        const dateA = new Date(a.publish_date);
        const dateB = new Date(b.publish_date);
        return dateB - dateA; // For descending order
      });
  
      setRelatedArticles(filteredRelated);
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };
  
  
  useEffect(() => {
    fetchArticle();
  }, [articleGuid]);
  
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="text-center">
        <h2 className="text-2xl font-bold text-blue-800 pt-4">{article ? (article.title) : ''}</h2>
      </header>
      <main className="">
        <section className="">
          {article ? (
            <Card 
              title=""
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
        <section className="mb-8 bg-white shadow text-center">
        <header className="">
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