// src/reducers/lastArticleIdReducer.js

import { createSlice } from '@reduxjs/toolkit';

export const lastArticleIdSlice = createSlice({
  name: 'lastArticleId',
  initialState: {
    lastArticleId: null,
  },
  reducers: {
    setLastArticleId: (state, action) => {
      state.lastArticleId = action.payload;
    },
  },
});

export const { setLastArticleId } = lastArticleIdSlice.actions;
export default lastArticleIdSlice.reducer;
