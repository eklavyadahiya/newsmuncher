import React from 'react';

const BackToTopButton = () => {
  const scrollToTop = () => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <button onClick={scrollToTop} style={styles.backToTopButton}>
    &nbsp;↑&nbsp;
    </button>
  );
};

const styles = {
  backToTopButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px',
    backgroundColor: '#007bff',
    opacity: 0.76,
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default BackToTopButton;
