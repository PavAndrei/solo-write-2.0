// src/store/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkAuth, signIn, signUp, signout } from '../../api/apiAuth';
import { SignInData } from '../../utils/authSchemas';

interface UserData {
  // Переименуем UserState в UserData для ясности
  userId: string;
  email: string;
  role: string;
  verified: boolean;
  username?: string;
  avatarUrl?: string;
}

interface AuthState {
  user: UserData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

// Обновляем типы для Thunk-функций
export const loginUser = createAsyncThunk<
  UserData | null,
  Omit<SignInData, 'repeatPassword' | 'terms' | 'file' | 'username'>
>('auth/login', async (formData, { rejectWithValue }) => {
  const response = await signIn(formData);
  if (!response.success || !response.user) {
    return rejectWithValue(response.message || 'Login failed');
  }
  return response.user;
});

export const registerUser = createAsyncThunk<UserData | null, FormData>(
  'auth/register',
  async (formData, { rejectWithValue }) => {
    const response = await signUp(formData);
    if (!response.success || !response.user) {
      return rejectWithValue(response.message || 'Registration failed');
    }
    return response.user;
  }
);

export const checkUserSession = createAsyncThunk<UserData | null, void>(
  'auth/checkSession',
  async (_, { rejectWithValue }) => {
    const response = await checkAuth();
    if (!response.success || !response.user) {
      return rejectWithValue(response.message || 'Session check failed');
    }
    return response.user;
  }
);

export const signoutUser = createAsyncThunk('auth/signout', async (_, { rejectWithValue }) => {
  const response = await signout();
  if (!response.success) {
    return rejectWithValue(response.message);
  }
  return null; // Очищаем пользователя
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка состояний для всех Thunk-функций
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(checkUserSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkUserSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(checkUserSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
      })
      .addCase(signoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      })
      .addCase(signoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
