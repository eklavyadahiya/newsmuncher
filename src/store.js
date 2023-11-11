// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './reducers/articlesSlice';
import lastArticleIdReducer from './reducers/lastArticleIdSlice';

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    lastArticleId: lastArticleIdReducer,
  },
});

export default store;
