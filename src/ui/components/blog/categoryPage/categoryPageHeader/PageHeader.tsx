import { Box, Button, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useCategoryArticles } from '../hook/useCategoryArticles';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
        padding: 2,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h1" sx={{
        fontSize: { xs: '1.5rem', sm: '2rem' },
        color: 'white',
      }}>
        {title ? title : `Статьи: ${decodedCategory}`}
      </Typography>

      {/* Бургер-меню */}
      {articlePage && (
        <Box sx={{ display: { xs: 'block', sm: 'none' }, position: 'absolute', right: 16 }}>
          <IconButton onClick={handleMenuClick} color="inherit">
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
          alignSelf: { xs: 'stretch', sm: 'auto' },
        }}
      >
        <Button variant="contained" onClick={onHandleClick} sx={{ display: { xs: 'none', sm: 'block' }, border: '1px solid', borderColor: 'white' }}>
          Задать вопрос юристу
        </Button>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ display: { xs: 'none', sm: 'block' }, border: '1px solid', borderColor: 'white' }}>
          Назад
        </Button>
        <Button variant="contained" component={Link} to="/" sx={{ display: { xs: 'none', sm: 'block' }, border: '1px solid', borderColor: 'white' }}>
          На главную
        </Button>
      </Box>

      {/* Menu (выпадающее меню) */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={() => { item.action(); handleCloseMenu(); }}>
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}





