import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Typography, CircularProgress, Snackbar } from '@mui/material';
import { resetFormState, submitForm } from '../../../store/slice/formSlice';
import { RootState, useAppDispatch } from '../../../store/store';


export interface FormValues {
  name: string;
  number: number;
  task: string;
}

export const Form = () => {
  const dispatch = useAppDispatch(); // используем типизированный dispatch
  const { loading, success, error } = useSelector((state: RootState) => state.form);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(submitForm(data));
  };

  useEffect(() => {
    if (success || error) {
      const timeoutId = setTimeout(() => {
        dispatch(resetFormState());
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [success, error, dispatch]);

  console.log(error)
  console.log(success)
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#708090',
        color: '#FAEBD7',
        gap: '16px',
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #1976d2',
        borderRadius: '8px',
        boxShadow: 3,
        marginTop: '50px',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Задайте вопрос юристу
      </Typography>

      <TextField
        label="Как к Вам обратиться"
        variant="outlined"
        id="name"
        {...register('name', { required: 'Имя обязательно' })}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
        sx={{
          '& label': { color: 'skyblue' },           // цвет label
          '& label.Mui-focused': { color: 'skyblue' }, // цвет label при фокусе
          '& .MuiOutlinedInput-root': {
            color: '#FAEBD7',                        // цвет текста input
            '& fieldset': {
              borderColor: 'skyblue',                // цвет рамки
            },
            '&:hover fieldset': {
              borderColor: '#20b1e1',                // цвет рамки при ховере
            },
            '&.Mui-focused fieldset': {
              borderColor: 'skyblue',                // цвет рамки при фокусе
            },
          },
        }}
      />

      <TextField
        label="Телефон для связи"
        variant="outlined"
        id="number"
        type="number"
        {...register('number', { required: 'Номер обязателен', valueAsNumber: true })}
        error={!!errors.number}
        helperText={errors.number ? errors.number.message : ''}
                sx={{
          '& label': { color: 'skyblue' },           // цвет label
          '& label.Mui-focused': { color: 'skyblue' }, // цвет label при фокусе
          '& .MuiOutlinedInput-root': {
            color: '#FAEBD7',                        // цвет текста input
            '& fieldset': {
              borderColor: 'skyblue',                // цвет рамки
            },
            '&:hover fieldset': {
              borderColor: '#20b1e1',                // цвет рамки при ховере
            },
            '&.Mui-focused fieldset': {
              borderColor: 'skyblue',                // цвет рамки при фокусе
            },
          },
        }}
      />

      <TextField
        label="Ваш вопрос"
        variant="outlined"
        id="task"
        multiline
        rows={4}
        {...register('task', { required: 'Задача обязательна' })}
        error={!!errors.task}
        helperText={errors.task ? errors.task.message : ''}
                sx={{
          '& label': { color: 'skyblue' },           // цвет label
          '& label.Mui-focused': { color: 'skyblue' }, // цвет label при фокусе
          '& .MuiOutlinedInput-root': {
            color: '#FAEBD7',                        // цвет текста input
            '& fieldset': {
              borderColor: 'skyblue',                // цвет рамки
            },
            '&:hover fieldset': {
              borderColor: '#20b1e1',                // цвет рамки при ховере
            },
            '&.Mui-focused fieldset': {
              borderColor: 'skyblue',                // цвет рамки при фокусе
            },
          },
        }}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ marginTop: '16px' }}
        disabled={loading} // отключаем кнопку во время загрузки
      >
        {loading ? <CircularProgress size={24} /> : 'Отправить'}
      </Button>

      <Snackbar
        open={success === "succeeded" || error !== null}
        autoHideDuration={6000}
        onClose={() => dispatch(resetFormState())}
        slotProps={{
          content: {
            style: {
              backgroundColor: success === "succeeded" ? 'green' : 'red',
              color: 'white',
            },
          },
        }}
        message={success === "succeeded" ? "Данные успешно отправлены!" : error}
      />

    </Box>
  );
};




