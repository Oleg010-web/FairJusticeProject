import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
  Container,
  Avatar,
  Tooltip,
  Fade,
  Slide,
  Switch,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';

const pages = [
  { label: 'Цены на услуги юриста', path: '/pricing' },
  { label: 'Юридический блог', path: '/blog' },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

type Props = {
  changeTheme: () => void
}

export const Header = ({ changeTheme }: Props) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          {/* Логотип и название для десктопа */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'white' }} />
          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'white',
              textDecoration: 'none',
              userSelect: 'none',
              cursor: 'pointer',
            }}
          >
            Юрист - В.И.Ивушкин
          </Typography>
          <Typography  gutterBottom sx={{maxWidth: '150px', width: '100%', margin: 'auto' }}>
            +7 (985) 769-46-99{' '}
            {/* Иконки мессенджеров */}
            <IconButton
              aria-label="WhatsApp"
              onClick={() => window.open('https://api.whatsapp.com/send?phone=79857694699', '_blank')}
              
            >
              <WhatsAppIcon sx={{fontSize:'20px'}}/>
            </IconButton>
            <IconButton
              aria-label="Telegram"
              onClick={() => window.open('https://t.me/your_username', '_blank')} // Замените "your_username" на ваш логин в Telegram
            >
              <TelegramIcon sx={{fontSize:'20px'}}/>
            </IconButton>
          </Typography>

          {/* Меню для мобильных */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', alignItems: 'center' } }}>
            <IconButton
              size="small"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              slots={{ transition: Fade }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  component={RouterLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{ typography: 'body1' }}
                >
                  {page.label}
                </MenuItem>
              ))}
            </Menu>
            <Switch onChange={changeTheme} />
          </Box>

          {/* Логотип и название для мобильных */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'white' }} />
          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'white',
              textDecoration: 'none',
              userSelect: 'none',
              cursor: 'pointer',
            }}
          >
            Юрист - В.И.Ивушкин
          </Typography>

          {/* Отступ для выравнивания */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Кнопки страниц и аватар для десктопа */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
            <Switch onChange={changeTheme} />
            {pages.map((page) => (
              <Button
                key={page.label}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  fontWeight: 600,
                  textTransform: 'none',
                  mx: 1,
                  borderRadius: 2,
                  transition: 'transform 0.25s ease, background-color 0.25s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

