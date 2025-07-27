import { createSlice } from '@reduxjs/toolkit';
import { GetAllArticlesParams } from '../../types/apiTypes';

const initialState: GetAllArticlesParams = {
  startIndex: 0,
  limit: 0,
  order: 'desc',
  category: [],
  searchTerm: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStartIndex(state, action) {
      state.startIndex = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setStartIndex, setLimit, setOrder, setCategory, setSearchTerm } =
  filtersSlice.actions;

export default filtersSlice.reducer;
