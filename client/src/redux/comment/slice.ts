import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/apiTypes';
import { CommentList } from '../../types/types';
import { deleteComment, getArticleComments } from '../../api/apiComments';

export const fetchArticleComments = createAsyncThunk(
  'comments/singleArticleComments',
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

export const deleteCommentThunk = createAsyncThunk(
  'comments/delete',
  async (commentId: string, { rejectWithValue }) => {
    try {
      const result = await deleteComment(commentId);
      if (!result.success) {
        throw new Error(result.message);
      }
      return { id: commentId };
    } catch (err) {
      return rejectWithValue({
        message: err instanceof Error ? err.message : 'Failed to delete comment',
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
    optimisticDeleteComment: (state, action) => {
      state.items = state.items.filter((c) => c._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticleComments.pending, (state, action) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchArticleComments.fulfilled, (state, action) => {
      const newComments = action.payload.data.filter(
        (newComment) => !state.items.some((item) => item._id === newComment._id)
      );
      state.items = [...newComments, ...state.items];
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchArticleComments.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(deleteCommentThunk.fulfilled, (state, action) => {
      state.items = state.items.filter((comment) => comment._id !== action.payload.id);
    });
  },
});

export const { clearCurrentComments, updateCommentLike, addNewComment, optimisticDeleteComment } =
  commentSlice.actions;
export default commentSlice.reducer;
