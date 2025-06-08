import { configureStore } from '@reduxjs/toolkit';
import { formReducer } from './slice/formSlice';
import { useDispatch } from 'react-redux';


const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>


export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
