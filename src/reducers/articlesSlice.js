// src/reducers/articlesReducer.js

import { createSlice } from '@reduxjs/toolkit';

export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
  },
  reducers: {
    appendArticles: (state, action) => {
      const combinedArticles = [...state.articles, ...action.payload];
      const uniqueArticles = Array.from(new Map(combinedArticles.map(article => [article.guid, article])).values());
      state.articles = uniqueArticles;
    },
  },
});

// Export the action creators and the reducer
export const { appendArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
