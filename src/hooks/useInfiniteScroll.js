import { useEffect } from 'react';

const useInfiniteScroll = (loadMoreData) => {
  useEffect(() => {
    const container = document.getElementById('root');

    const handleScroll = () => {
      if (container) {
        const { scrollTop, clientHeight, scrollHeight } = container;
        if (scrollTop + clientHeight >= scrollHeight - 700) {
          loadMoreData();
        }
      }
    };
    
    container && container.addEventListener('scroll', handleScroll);

    return () => {
      container && container.removeEventListener('scroll', handleScroll);
    };
  }, [loadMoreData]);
};

export default useInfiniteScroll;