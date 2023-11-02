// src/App.js
import React, { Suspense, lazy } from 'react';
import { Navigate, HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
const HomePage = lazy(() => import('./pages/HomePage'));
const TrendingPage = lazy(() => import('./pages/TrendingPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));

function App() {
  return (
    <Router>
      <Navbar/>
      <Suspense fallback={<div>Loading...</div>}>
      <main className="main-content">
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<Navigate replace to="/IN" />} />
          
          <Route
            path="/:country/"
            element={<TrendingPage apiEndpoint="trending" />}
          />

          <Route
            path="/:country/latest/"
            element={<TrendingPage apiEndpoint="latest" />}
          />

          <Route
            path="/:country/tag/:tag/"
            element={<TrendingPage apiEndpoint="tag" />}
          />

          <Route
            path="/:country/article/:article"
            element={<ArticlePage apiEndpoint="article" />}
          />
        </Routes>
        </main>
      </Suspense>
    </Router>
  );
}

export default App;
