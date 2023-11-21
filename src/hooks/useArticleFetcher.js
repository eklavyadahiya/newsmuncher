// src/hooks/useArticleFetcher.js
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

function useArticleFetcher(apiEndpoint, pageType, tag='') {
  const [articles, setArticles] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const fetchingLock = useRef(false);

  const fetchArticles = async (url = nextUrl || apiEndpoint) => {
    if(fetchingLock.current) return;
    fetchingLock.current = true;
    setIsFetching(true);

    try {
      let response;
      if (pageType === 'tag') {
        response = await axios.post(url, {
          tag_slugs: [tag],
          filter_condition: "AND"})
      } else {
        response = await axios.get(url);
      };
      
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

  const loadMoreData = () => {
    if (nextUrl && !isFetching) {
        fetchArticles(nextUrl);
    }
  };

  useEffect(() => {
    setArticles([]);
    fetchArticles();
  }, [apiEndpoint]);

  return { articles, isFetching, loadMoreData, setIsFetching };
}

export default useArticleFetcher;
