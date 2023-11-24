// src/hooks/useSearchArticleFetcher.js
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

function useSearchArticleFetcher(apiEndpoint, pageType, tag='', searchQuery, fromDate, toDate, sortBy) {
  const [articles, setArticles] = useState([]);
  const [currentApiEndpoint, setCurrentApiEndpoint] = useState(apiEndpoint);
  const [nextUrl, setNextUrl] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const fetchingLock = useRef(false);

  const fetchArticles = async (newEndpoint = currentApiEndpoint) => {
    if (fetchingLock.current) return;
    fetchingLock.current = true;
    setIsFetching(true);

    try {
        const response = await axios.get(newEndpoint);
        setNextUrl(response.data.next);

        setArticles(prevArticles => {
            const newArticles = [...prevArticles, ...response.data.results];
            const uniqueGUIDs = new Set();
            return newArticles.filter(article => {
                const isUnique = !uniqueGUIDs.has(article.guid);
                uniqueGUIDs.add(article.guid);
                return isUnique;
            });
        });
    } catch (error) {
        console.error("Error fetching articles:", error);
    } finally {
        setIsFetching(false);
        fetchingLock.current = false;
    }
};


const updateApiEndpoint = (newEndpoint) => {
  setCurrentApiEndpoint(newEndpoint);
};

  const loadMoreData = () => {
    if (nextUrl && !isFetching) {
        fetchArticles(nextUrl);
    }
  };


  return { articles, isFetching, loadMoreData, setIsFetching, updateApiEndpoint, fetchArticles };
}

export default useSearchArticleFetcher;
