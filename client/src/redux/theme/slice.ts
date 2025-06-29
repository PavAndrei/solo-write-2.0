import { createSlice } from '@reduxjs/toolkit';

import { theme } from './types';

const initialState: theme = {
  themeColor: 'light',
};

const themeSlice = createSlice({
  name: 'themeColor',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeColor = state.themeColor === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
