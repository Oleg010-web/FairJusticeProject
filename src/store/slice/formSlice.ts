import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FormValues } from '../../ui/components/form/Form';
import { createParseClient } from '../../api/clientApi';

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
export type Error = string | null

interface FormState {
  loading: boolean;
  success: RequestStatus;
  error: Error;
}

const initialState: FormState = {
  loading: false,
  success: "idle" as RequestStatus,
  error: null,
};


const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    resetFormState(state) {
      state.loading = false;
      state.success = "idle";
      state.error = null as Error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.loading = true;
        state.success = "idle"; // сбрасываем успех при новой загрузке
        state.error = null; // сбрасываем ошибку
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.loading = false; // загружено успешно
        state.success = "succeeded"; // помечаем успешное выполнение
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.loading = false; // не удалось загрузить
        state.success = "failed"; // помечаем как неудавшееся
        state.error = action.payload ? action.payload as string : 'Ошибка соединения, попробуйте еще раз!'; // устанавливаем ошибку
      });
  },
});

// Создаем асинхронную операцию для отправки формы
export const submitForm = createAsyncThunk('form/submit', async (data: FormValues, { rejectWithValue }) => {
  try {
    const response = await createParseClient(data);
    return response; // предполагается, что API возвращает успешный ответ
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return rejectWithValue(errorMessage);
  }
});

export const { resetFormState } = formSlice.actions;
export const formReducer = formSlice.reducer
