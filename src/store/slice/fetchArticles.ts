import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Parse from '../../common/parseClient';
import { marked } from 'marked';

// Типы статуса и ошибки, как в примере
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
export type Error = string | null;

// Тип статьи
export interface Article {
  id: string;
  categories: string[] | string; // в зависимости от того, как у тебя категории хранятся
  title: string;
  content: string;
  image: string | null; // URL картинки или null
}

interface ArticlesState {
  items: Article[];
  loading: boolean;
  success: RequestStatus;
  error: Error;
}

const initialState: ArticlesState = {
  items: [],
  loading: false,
  success: "idle",
  error: null,
};


const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    resetArticlesState(state) {
      state.items = [];
      state.loading = false;
      state.success = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.success = "idle";
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.success = "failed";
        state.error = action.payload ?? 'Ошибка соединения, попробуйте еще раз!';
      });
  },
});


// Асинхронный thunk для загрузки статей из Back4App
export const fetchArticles = createAsyncThunk<Article[], void, { rejectValue: string }>(
  'articles/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const blog = Parse.Object.extend('blog');
      const query = new Parse.Query(blog);
      const results  = await query.find();

      const articles: Article[] = results.map((article: any) => ({
        id: article.id, // говорим TS, что id точно есть
        categories: article.get('categories'),
        title: article.get('title'),
        content: article.get('content') ? marked(article.get('content'), { breaks: true }) : '',
        image: article.get('ArticleImage') ? article.get('ArticleImage').url() : null,
      }));

      return articles;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      return rejectWithValue(errorMessage);
    }
  }
);

export const { resetArticlesState } = articlesSlice.actions;
export const articlesReducer = articlesSlice.reducer;
