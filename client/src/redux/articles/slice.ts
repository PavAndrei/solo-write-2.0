import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllArticles } from '../../api/apiArticle';
import { GetAllArticlesParams, Status } from '../../types/apiTypes';
import { ArticleList } from '../../types/types';

export const fetchArticles = createAsyncThunk(
  'articles/all',
  async (params: GetAllArticlesParams, { rejectWithValue }) => {
    try {
      return await getAllArticles(params);
    } catch (err) {
      return rejectWithValue({
        message: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }
);

interface ArticleSliceState {
  items: ArticleList;
  lastMonthArticles: number;
  totalArticles: number;
  status: Status;
}

const initialState: ArticleSliceState = {
  items: [],
  lastMonthArticles: 0,
  totalArticles: 0,
  status: Status.LOADING,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    updateCardLikes: (state, action) => {
      const { articleId, likesCount, likedBy } = action.payload;
      const article = state.items.find((article) => article._id === articleId);
      if (article) {
        article.likesCount = likesCount;
        article.likedBy = likedBy;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
      state.lastMonthArticles = 0;
      state.totalArticles = 0;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.items = action.payload.articles;
      state.lastMonthArticles = action.payload.lastMonthArticles;
      state.totalArticles = action.payload.totalArticles;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchArticles.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
      state.lastMonthArticles = 0;
      state.totalArticles = 0;
    });
  },
});

export const { updateCardLikes } = articleSlice.actions;

export default articleSlice.reducer;
