import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Box, TextField, Button, Typography, CircularProgress, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { resetFormState, submitForm } from '../../../store/slice/formSlice';
import { RootState, useAppDispatch } from '../../../store/store';
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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
      sx={{maxWidth: {xs: '300px', sm: '400px'}}}
    >
      <Box className={styles.closeButton}>
        <IconButton
          aria-label="close form"
          onClick={handleClose}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

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
        className={styles.input}
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
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={styles.submitButton}
        disabled={loading}
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





