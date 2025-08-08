import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteArticle, getAllArticles } from '../../api/apiArticle';
import { GetAllArticlesParams, Status } from '../../types/apiTypes';
import { ArticleList } from '../../types/types';

export const fetchArticles = createAsyncThunk(
  'articles/all',
  async (params?: GetAllArticlesParams, { rejectWithValue }) => {
    try {
      return await getAllArticles(params);
    } catch (err) {
      return rejectWithValue({
        message: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }
);

export const deleteArticleThunk = createAsyncThunk(
  'articles/deleteOne',
  async (id: string, { rejectWithValue }) => {
    try {
      return await deleteArticle(id);
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
    optimisticDeleteArticle: (state, action) => {
      state.items = state.items.filter((article) => article._id !== action.payload);
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
    builder.addCase(deleteArticleThunk.fulfilled, (state) => {
      state.totalArticles = Math.max(0, state.totalArticles - 1);
      // Обновляем количество статей за последний месяц
      const now = new Date();
      const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      state.items = state.items.filter((article) => {
        const articleDate = new Date(article.createdAt);
        return articleDate >= oneMonthAgo;
      });
      state.lastMonthArticles = state.items.length;
    });
  },
});

export const { updateCardLikes, optimisticDeleteArticle } = articleSlice.actions;

export default articleSlice.reducer;
