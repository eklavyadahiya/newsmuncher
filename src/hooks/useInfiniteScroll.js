import { useEffect } from 'react';

const useInfiniteScroll = (scrollRef, loadMoreData) => {
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 700) {
          loadMoreData();
        }
      }
    };
    
    const container = scrollRef.current;
    container && container.addEventListener('scroll', handleScroll);

    return () => {
      container && container.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef, loadMoreData]);
};

export default useInfiniteScroll;