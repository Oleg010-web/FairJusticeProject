import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определяем типы для состояния темы
type ThemeMode = 'light' | 'dark';

interface ThemeState {
  themeMode: ThemeMode;
}

// Начальное состояние
const initialState: ThemeState = {
  themeMode: 'light',
};

// Создаем слайс
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light'; // Переключаем тему
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload; // Устанавливаем тему по умолчанию
    },
  },
});

// Экспортируем.actions и редюсер
export const { toggleTheme, setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;