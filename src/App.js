// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Outlet, Navigate, RouterProvider, createBrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar'
import TrendingPage from './pages/TrendingPage'
import ErrorPage from './pages/ErrorPage'
import LatestArticlesPage from './pages/LatestArticlesPage'
import ArticlePage from './pages/ArticlePage'

function App() {
  function Layout() {
    return (
        <>
        <Provider store={store}>
          <Navbar />
          <Outlet />
          </Provider>
        </>
    );
  }

  const router = Router([
    {
      element: <Layout/>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Navigate to="/IN" replace />,
        },
        {
          path: "/:country",
          element: <LatestArticlesPage isTrending={false} />,
        },
        {
          path: "/:country/latest",
          element: <LatestArticlesPage isTrending={true} />,
        },
        {
          path: "/:country/article/:article",
          element: <ArticlePage />,
        },
      ]
    }
  ]);

  
  return (
    <React.StrictMode>
    <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
