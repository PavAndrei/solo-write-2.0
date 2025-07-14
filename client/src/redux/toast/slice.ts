import { createSlice } from '@reduxjs/toolkit';

type ToastItem = {
  id: string;
  color: 'error' | 'success';
  text: string;
};

type ToastState = {
  toastList: ToastItem[];
};

const initialState: ToastState = {
  toastList: [],
};

const toastSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    addToast: (state, action) => {
      const newToast: ToastItem = {
        id: Date.now().toString() + Math.random().toString(),
        color: action.payload.color,
        text: action.payload.text,
      };

      state.toastList.push(newToast);
    },
    removeToast: (state, action) => {
      state.toastList = state.toastList.filter((h) => h.id !== action.payload.id);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
