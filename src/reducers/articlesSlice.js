import { createSlice } from '@reduxjs/toolkit';

export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    trending: [],
    latest: [],
    tags: {},
  },
  reducers: {
    appendArticles: (state, action) => {
      const { pageType, articles } = action.payload;
      if (pageType === 'trending') {
        state.trending = mergeArticles(state.trending, articles);
      } else if (pageType === 'latest') {
        state.latest = mergeArticles(state.latest, articles);
      } else if (pageType === 'tag') {
        const tag = action.payload.tag;
        state.tags[tag] = mergeArticles(state.tags[tag] || [], articles);
      }
    },
  },
});

function mergeArticles(existingArticles, newArticles) {
  const combinedArticles = [...existingArticles, ...newArticles];
  return Array.from(new Map(combinedArticles.map(article => [article.guid, article])).values());
}

export const { appendArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
