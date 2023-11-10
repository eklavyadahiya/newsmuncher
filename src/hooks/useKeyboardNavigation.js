import { useEffect } from 'react';

const useKeyboardNavigation = (scrollRef) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const container = scrollRef.current; 
      const scrollAmount = window.innerHeight; 
  
      switch (e.keyCode) {
        case 37: // left arrow
        case 38: // up arrow
          container && container.scrollBy({
            top: -scrollAmount,
            behavior: 'smooth',
          });
          break;
        case 39: // right arrow
        case 40: // down arrow
          container && container.scrollBy({
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
  }, [scrollRef]);
};

export default useKeyboardNavigation;