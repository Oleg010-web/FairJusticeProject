import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Fade,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Иконка закрытия (убедись, что @mui/icons-material установлен)

interface Service {
  id: string;
  title: string;
  description: string;
}

interface ServiceModalProps {
  open: boolean;
  onClose: () => void;
  selectedService: Service | null;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  open,
  onClose,
  selectedService,
}) => {
  if (!selectedService) return null; // Если услуги нет, ничего не рендерим

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Fade} // Анимация открытия/закрытия
      TransitionProps={{ timeout: 300 }} // Длительность анимации (0.3 сек)
      maxWidth="sm" // Максимальная ширина модалки
      fullWidth // Занимает всю доступную ширину
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '16px', // Закруглённые края
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)', // Тень для глубины
          backgroundColor: '#fff', // Фон белый (или адаптируй под тему)
        },
      }}
    >
      {/* Заголовок с иконкой закрытия */}
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 24px 16px', // Отступы
          backgroundColor: '#f5f5f5', // Лёгкий серый фон заголовка
          borderBottom: '1px solid #e0e0e0', // Разделитель
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '1.5 rem',
            color: '#1976d2', // Синий цвет заголовка
            flexGrow: 1,
          }}
        >
          {selectedService.title}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: '#666', // Серый цвет иконки
            '&:hover': { color: '#1976d2' }, // Синий при наведении
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Содержимое: описание услуги */}
      <DialogContent
        sx={{
          padding: '24px', // Отступы
          minHeight: '150px', // Минимальная высота для читаемости
        }}
      >
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.6, // Межстрочный интервал для читаемости
            color: '#333', // Тёмно-серый текст
          }}
        >
          {selectedService.description}
        </Typography>
      </DialogContent>

      {/* Действия: кнопка закрытия */}
      <DialogActions
        sx={{
          padding: '16px 24px 24px', // Отступы
          justifyContent: 'center', // Центрируем кнопку
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: '#1976d2', // Синий фон
            '&:hover': { backgroundColor: '#1565c0' }, // Тёмно-синий при наведении
            borderRadius: '8px', // Закруглённые края кнопки
            padding: '10px 20px', // Размер кнопки
          }}
        >
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};
