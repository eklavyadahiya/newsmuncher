import { createSlice } from '@reduxjs/toolkit';

export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    trending: [],
    latest: [],
    tags: {},
    searchResults: [],
  },
  reducers: {
    appendArticles: (state, action) => {
      const { pageType, articles } = action.payload;
      if (pageType === 'trending') {
        state.trending = mergeArticles(state.trending, articles);
      } else if (pageType === 'latest') {
        state.latest = mergeArticles(state.latest, articles);
      } else if (pageType === 'search') {
        state.searchResults = articles;
      } else if (pageType === 'tag') {
        const tag = action.payload.tag;
        state.tags[tag] = mergeArticles(state.tags[tag] || [], articles);
      }
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
});

function mergeArticles(existingArticles, newArticles) {
  const safeExistingArticles = Array.isArray(existingArticles) ? existingArticles : [];
  const combinedArticles = [...safeExistingArticles, ...newArticles];
  return Array.from(new Map(combinedArticles.map(article => [article.guid, article])).values());
}

export const { appendArticles, clearSearchResults } = articlesSlice.actions;
export default articlesSlice.reducer;
