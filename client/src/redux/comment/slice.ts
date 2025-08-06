import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/apiTypes';
import { CommentList } from '../../types/types';
import { getArticleComments } from '../../api/apiComments';

export const fetchArticleComments = createAsyncThunk(
  'articles/all',
  async (articleId: string, { rejectWithValue }) => {
    try {
      return await getArticleComments(articleId);
    } catch (err) {
      return rejectWithValue({
        message: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }
);

interface CommentSliceState {
  items: CommentList;
  status: Status;
}

const initialState: CommentSliceState = {
  items: [],
  status: Status.LOADING,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    clearCurrentComments: (state) => {
      state.items = [];
    },
    updateCommentLike: (state, action) => {
      const { entityId, likesCount, likedBy } = action.payload;
      const comment = state.items.find((c) => c._id === entityId);
      if (comment) {
        comment.numberOfLikes = likesCount;
        comment.likes = likedBy;
      }
    },
    addNewComment: (state, action) => {
      state.items.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticleComments.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchArticleComments.fulfilled, (state, action) => {
      // Объединяем старые и новые комментарии, избегая дубликатов
      const newComments = action.payload.data.filter(
        (newComment) => !state.items.some((item) => item._id === newComment._id)
      );
      state.items = [...newComments, ...state.items];
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchArticleComments.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { clearCurrentComments, updateCommentLike, addNewComment } = commentSlice.actions;
export default commentSlice.reducer;
