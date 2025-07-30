import { createSlice } from '@reduxjs/toolkit';
import { GetAllArticlesParams } from '../../types/apiTypes';

const initialState: GetAllArticlesParams = {
  startIndex: 0,
  limit: 5,
  order: 'desc',
  categories: [],
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
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setStartIndex, setLimit, setOrder, setCategories, setSearchTerm } =
  filtersSlice.actions;

export default filtersSlice.reducer;
