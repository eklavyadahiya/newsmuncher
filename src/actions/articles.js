// Action Types
export const APPEND_ARTICLES = 'APPEND_ARTICLES';

// Action Creators
export const appendArticles = (newArticles) => ({
  type: APPEND_ARTICLES,
  payload: newArticles,
});
