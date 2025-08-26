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
      <Container maxWidth='lg' sx={{ px: { xs: 1, sm: 2 } }}>
        <Toolbar disableGutters sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>

          {/* Контакты и мессенджеры */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 0.5, sm: 1 }
          }}>
            <Typography
              component="a"
              href="tel:+79857694699"
              sx={{
                fontSize: { xs: '12px', sm: '14px', md: '16px' },
                textAlign: 'center',
                color: 'white',
                textDecoration: 'none', // Убираем подчеркивание
                '&:hover': {
                  textDecoration: 'underline', // Подчеркивание при наведении
                  color: 'lightgreen'
                }
              }}
            >
              +7 (985) 769-46-99
            </Typography>

            {/* Иконки мессенджеров */}
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton
                aria-label="WhatsApp"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=79857694699', '_blank')}
                size="small"
                sx={{ color: 'white' }}
              >
                <WhatsAppIcon sx={{ fontSize: { xs: '18px', sm: '20px' } }} />
              </IconButton>
              <IconButton
                aria-label="Telegram"
                onClick={() => window.open('https://t.me/your_username', '_blank')}
                size="small"
                sx={{ color: 'white' }}
              >
                <TelegramIcon sx={{ fontSize: { xs: '18px', sm: '20px' } }} />
              </IconButton>
            </Box>
          </Box>

          {/* Логотип и название для десктопа */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
            <AdbIcon sx={{ mr: 1, color: 'white' }} />
            <Typography
              noWrap
              sx={{
                fontWeight: 700,
                color: 'white',
                textDecoration: 'none',
                userSelect: 'none',
                cursor: 'pointer',
                fontSize: { md: '1.1rem', lg: '1.25rem' }
              }}
            >
              Юрист - В.И.Ивушкин
            </Typography>
          </Box>

          {/* Меню для мобильных */}
          {/* Логотип для мобильных */}
          <Typography
            noWrap
            // Вариант 2: Инициалы в две строки
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'column',
              alignItems: 'center',
              fontWeight: 400,
              fontSize: { xs: '11px', sm: '14px' },
              color: 'white',
              textAlign: 'center',
              lineHeight: '1.1'
            }}
          >
            <span>Юрист</span>
            <span>В.И.Ивушкин</span>
          </Typography>

          <Box sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            gap: 1
          }}>

            <Switch onChange={changeTheme} size="small" />

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
              sx={{ mt: 1 }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  component={RouterLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{ typography: 'body1', fontSize: '14px' }}
                >
                  {page.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Кнопки страниц для десктопа */}
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 1
          }}>
            <Switch onChange={changeTheme} size="small" />
            {pages.map((page) => (
              <Button
                key={page.label}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  color: 'white',
                  display: 'block',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '14px',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  transition: 'transform 0.25s ease, background-color 0.25s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transform: 'scale(1.05)',
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

