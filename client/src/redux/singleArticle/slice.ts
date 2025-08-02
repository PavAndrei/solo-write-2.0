import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from '../../types/types';

interface ArticleState {
  currentArticle: Article | null;
  loading: boolean;
  error: string | null;
}

const initialState: ArticleState = {
  currentArticle: null,
  loading: false,
  error: null,
};

export const fetchArticle = createAsyncThunk('articles/fetchOne', async (slug: string) => {
  const res = await fetch(`http://localhost:5000/api/article/${slug}`);
  const data = await res.json();
  return data.data;
});

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    updateArticleLikes: (state, action) => {
      if (state.currentArticle) {
        state.currentArticle.likesCount = action.payload.likesCount;
        state.currentArticle.likedBy = action.payload.likedBy;
      }
    },
    clearCurrentArticle: (state) => {
      state.currentArticle = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load article';
      });
  },
});

export const { updateArticleLikes, clearCurrentArticle } = articlesSlice.actions;
export default articlesSlice.reducer;
