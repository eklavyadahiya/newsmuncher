import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import ErrorPage from './pages/ErrorPage'
import ListArticlesPage from './pages/ListArticlesPage'
import ArticlePage from './pages/ArticlePage'
import BackToTopButton from './components/BackToTopButton';
import SearchArticlesPage from './pages/SearchArticlesPage'

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/IN/latest" replace />} />
            <Route 
              path="/:country" 
              element={<ListArticlesPage key="trending" pageType="trending" />} 
            />
            <Route 
              path="/:country/search" 
              element={<SearchArticlesPage key="search" pageType="search" />} 
            />
            <Route 
              path="/:country/latest" 
              element={<ListArticlesPage key="latest" pageType="latest" />} 
            />
            <Route 
              path="/:country/tag/:tag" 
              element={<ListArticlesPage key="{tag}" pageType="tag" />} 
            />
            <Route path="/:country/article/:article" element={<ArticlePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
      </HashRouter>
      <BackToTopButton />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
