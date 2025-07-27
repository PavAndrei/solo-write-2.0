import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  themeColor: 'light' | 'dark';
}

// Функция для получения темы из localStorage
const getThemeFromLocalStorage = (): 'light' | 'dark' => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme === 'dark' ? 'dark' : 'light';
};

// Инициализационное состояние с проверкой localStorage
const initialState: ThemeState = {
  themeColor: getThemeFromLocalStorage(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.themeColor === 'light' ? 'dark' : 'light';
      state.themeColor = newTheme;
      // Сохраняем тему в localStorage при изменении
      localStorage.setItem('theme', newTheme);
    },
    // Опционально: редьюсер для явной установки темы
    setTheme: (state, action: { payload: 'light' | 'dark' }) => {
      state.themeColor = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
