import { configureStore } from '@reduxjs/toolkit';
import { formReducer } from './slice/formSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { articlesReducer } from './slice/fetchArticles';


const store = configureStore({
  reducer: {
    form: formReducer,
    article: articlesReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
