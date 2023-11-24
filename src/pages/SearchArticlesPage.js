import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appendArticles, clearSearchResults } from '../reducers/articlesSlice';
import { setLastArticleId } from '../reducers/lastArticleIdSlice';
import useSearchArticleFetcher from '../hooks/useSearchArticleFetcher';
import Card from '../components/Card';
import useInfiniteScroll from '../hooks/useInfiniteScroll';


function SearchArticlesPage({ pageType }) {
  const { country, tag } = useParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [sortBy, setSortBy] = useState('dateDesc'); // 'dateDesc' or 'dateAsc'
  const apiEndpoint = `https://api.newsmuncher.com/api/articles/${country}`;
  const { articles, loadMoreData, updateApiEndpoint, fetchArticles } = useSearchArticleFetcher(apiEndpoint, pageType, tag, searchQuery, fromDate, toDate, sortBy);
  const dispatch = useDispatch();
  const lastArticleId = useSelector(state => state.lastArticleId.lastArticleId);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useInfiniteScroll(loadMoreData);
  
  const pageTitle = 'Search'
  const searchArticles = useSelector(state => state.articles.searchResults);
  let searchResults = Array.isArray(searchArticles) ? searchArticles : [];
  
  useEffect(() => {
    if (articles.length > 0) {
      dispatch(appendArticles({ pageType: 'search', articles }));
    } 
  }, [articles, dispatch]);

  useEffect(() => {
    const lastArticleElement = document.getElementById(lastArticleId);
    if (lastArticleElement && isInitialLoad) {
      lastArticleElement.scrollIntoView();
      setIsInitialLoad(false);
    }
  }, [lastArticleId, isInitialLoad]);
  

  const handleSearch = () => {
    dispatch(clearSearchResults());
    
    const formattedQuery = searchQuery.split(' ').join('-');
    const newApiEndpoint = `https://api.newsmuncher.com/api/articles/${country}/?` +
      `date_from=${fromDate}&date_to=${toDate}&` +
      `q=${encodeURIComponent(formattedQuery)}&sort=${sortBy === 'dateDesc' ? '-publish_date' : 'publish_date'}`;
  
    updateApiEndpoint(newApiEndpoint);
    fetchArticles(newApiEndpoint);
  };
  const handleClearResults = () => {
    window.location.reload();
  };

  return (
    <div id="main" className="card-container-vertical"> 
        <div className="search-filters flex flex-wrap gap-4 p-4 bg-white shadow rounded-md">
    <input 
      type="text" 
      placeholder="Search..." 
      value={searchQuery} 
      onChange={e => setSearchQuery(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input 
      type="date" 
      value={fromDate} 
      onChange={e => setFromDate(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input 
      type="date" 
      value={toDate} 
      onChange={e => setToDate(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <select 
      value={sortBy} 
      onChange={e => setSortBy(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="dateDesc">Date Descending</option>
      <option value="dateAsc">Date Ascending</option>
    </select>
    
     {
          searchResults.length > 0 ? (
            <button 
              onClick={handleClearResults}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Clear Results
            </button>
          ) : (
            <button 
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Search
            </button>
          )}

  </div>

    <div className="text-center"><h2 className="text-2xl font-bold text-gray-800 pt-4 pageTitle">{pageTitle ? (pageTitle) : ''} </h2></div>
      {searchResults.map(article => (
        <div 
          key={article.guid} 
          id={article.guid} 
          className="card-wrapper-vertical"
          onClick={() => dispatch(setLastArticleId(article.guid))}
        >
          <Card 
            setNavigationSource={''}
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

export default SearchArticlesPage;
