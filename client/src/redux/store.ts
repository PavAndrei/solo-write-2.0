import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import theme from './theme/slice';
import auth from './auth/slice';
import toast from './toast/slice';
import article from './articles/slice';

const store = configureStore({
  reducer: { theme, auth, toast, article },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
