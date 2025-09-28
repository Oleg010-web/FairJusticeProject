import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Box, TextField, Button, Typography, CircularProgress, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { resetFormState, submitForm } from '../../../store/slice/formSlice';
import { RootState, useAppDispatch } from '../../../store/store';
import Parse from '../../../common/parseClient';
import styles from './Form.module.scss';

export interface FormValues {
  name: string;
  number: number;
  task: string;
}

type Props = {
  handleClose?: () => void
}

export const Form = ({ handleClose }: Props) => {
  const dispatch = useAppDispatch();
  const { loading, success, error } = useSelector((state: RootState) => state.form);
  const themeMode = useSelector((state: RootState) => state.theme.themeMode);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Сначала диспатчим в Redux (если нужно сохранить в стейт)
    dispatch(submitForm(data));

    // Затем отправляем уведомление в Telegram
    try {
      await Parse.Cloud.run('notifyTelegram', {
        message: `Новая заявка: Имя - ${data.name}, Телефон - ${data.number}, Вопрос - ${data.task}`
      });
      console.log('Уведомление в Telegram отправлено успешно');
    } catch (telegramError) {
      console.error('Ошибка отправки в Telegram:', telegramError);
      // Можно добавить дополнительную логику, например, показать ошибку пользователю
    }
  };



  useEffect(() => {
    if (success || error) {
      const timeoutId = setTimeout(() => {
        dispatch(resetFormState());
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [success, error, dispatch]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
      sx={{
        maxWidth: { xs: '300px', sm: '400px' },
        // Адаптация фона формы под тему
        backgroundColor: themeMode === 'dark' ? '#333' : '#fff', // Темный фон для темной темы
        color: themeMode === 'dark' ? '#fff' : '#000', // Светлый текст для темной темы
        padding: 2, // Добавь padding для лучшего вида
        borderRadius: 1,
      }}
    >
      <Box className={styles.closeButton}>
        <IconButton
          aria-label="close form"
          onClick={handleClose}
          size="small"
          sx={{
            color: themeMode === 'dark' ? '#fff' : '#000', // Цвет иконки
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Typography variant="h5" gutterBottom sx={{
        color: 'rgb(57, 98, 235)', // Оставь синий, или адаптируй: themeMode === 'dark' ? '#fff' : 'rgb(57, 98, 235)'
      }}>
        Задайте вопрос юристу
      </Typography>

      <TextField
        label="Как к Вам обратиться"
        variant="outlined"
        id="name"
        {...register('name', { required: 'Имя обязательно' })}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
        className={styles.input}
        sx={{
          // Адаптация для темной темы: темный фон поля, светлый текст
          '& .MuiInputBase-root': {
            backgroundColor: themeMode === 'dark' ? '#555' : '#fff',
            color: themeMode === 'dark' ? '#fff' : '#000',
          },
          '& .MuiInputLabel-root': {
            color: themeMode === 'dark' ? '#ccc' : '#000', // Цвет лейбла
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: themeMode === 'dark' ? '#ccc' : '#000', // Цвет бордера
          },
          '& .MuiFormHelperText-root': {
            color: themeMode === 'dark' ? '#ccc' : '#f44336', // Цвет ошибки
          },
          marginBottom: 2, // Добавь отступ для лучшего вида
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
        className={styles.input}
         sx={{
          // То же самое для всех TextField
          '& .MuiInputBase-root': {
            backgroundColor: themeMode === 'dark' ? '#555' : '#fff',
            color: themeMode === 'dark' ? '#fff' : '#000',
          },
          '& .MuiInputLabel-root': {
            color: themeMode === 'dark' ? '#ccc' : '#000',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: themeMode === 'dark' ? '#ccc' : '#000',
          },
          '& .MuiFormHelperText-root': {
            color: themeMode === 'dark' ? '#ccc' : '#f44336',
          },
          marginBottom: 2,
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
        className={styles.input}
         sx={{
          '& .MuiInputBase-root': {
            backgroundColor: themeMode === 'dark' ? '#555' : '#fff',
            color: themeMode === 'dark' ? '#fff' : '#000',
          },
          '& .MuiInputLabel-root': {
            color: themeMode === 'dark' ? '#ccc' : '#000',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: themeMode === 'dark' ? '#ccc' : '#000',
          },
          '& .MuiFormHelperText-root': {
            color: themeMode === 'dark' ? '#ccc' : '#f44336',
          },
          marginBottom: 2,
        }}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={styles.submitButton}
        disabled={loading}
         sx={{
          marginTop: 2,
          // Если нужно, адаптируй цвет кнопки: backgroundColor: themeMode === 'dark' ? '#555' : 'primary.main'
        }}
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





