import { Box, Button, Typography, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useCategoryArticles } from '../hook/useCategoryArticles';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Form } from "../../../form/Form";


type Props = {
  title?: string;
  articlePage?: boolean;
  onHandleClick?: () => void;
}

export const PageHeader = ({ title, articlePage, onHandleClick }: Props) => {
  const { decodedCategory } = useCategoryArticles(6);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: 'Назад', action: () => navigate(-1) },
    { text: 'На главную', action: () => navigate('/') },
    { text: 'Назад к разделам', action: () => navigate('/blog') },
  ];

  return (
    <Box
      mb={3}
      sx={{
        maxWidth: '1280px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        backgroundColor: '#1976d2',
        padding: { xs: 1, sm: 2 }, // Уменьшили паддинг на мобильных
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1, // Добавили отступ между элементами
      }}
    >
      {/* Заголовок (уменьшили шрифт на мобильных) */}
      <Typography
        variant="h5" // Было h4 → стало h5 (меньше)
        component="h1"
        sx={{
          color: 'white',
          maxWidth: { xs: '180px', sm: '550px' }, // Уменьшили maxWidth
          fontSize: { xs: '1rem', sm: '1.5rem' }, // Контролируем размер шрифта
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {title ? title : `Статьи: ${decodedCategory}`}
      </Typography>

      {/* Бургер-меню (переработали отступы и кнопку) */}
      {articlePage && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1, // Добавили отступ между кнопкой и бургером
          }}
        >
          {/* Кнопка "Задать вопрос юристу" (сжали текст) */}
          <Button
            variant="contained"
            color="secondary"
            onClick={onHandleClick}
            size="small"
            sx={{
              display: { xs: 'inline-flex', sm: 'none' },
              maxWidth: '120px', // Уменьшили ширину
              whiteSpace: 'nowrap',
              fontSize: '0.75rem', // Уменьшили шрифт
              px: 1, // Уменьшили горизонтальные паддинги
            }}
          >
            Вопрос юристу
          </Button>

          <IconButton
            onClick={handleMenuClick}
            color="inherit"
            sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {/* Десктопные кнопки (оставили без изменений) */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          gap: 1,
        }}
      >
        <Button variant="contained" onClick={onHandleClick} sx={{ border: '1px solid white' }}>
          Задать вопрос юристу
        </Button>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ border: '1px solid white' }}>
          Назад
        </Button>
        <Button variant="contained" component={Link} to="/" sx={{ border: '1px solid white' }}>
          На главную
        </Button>
      </Box>

      {/* Выпадающее меню (без изменений) */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={() => { item.action(); handleCloseMenu(); }}>
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};





