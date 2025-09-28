import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Modal, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { Form } from '../../../form/Form';
import { PageHeader } from '../categoryPageHeader/PageHeader';
import { ModalForm } from '../../../modal/ModalForm';
import { fetchArticles } from '../../../../../store/slice/fetchArticles';

export const ArticlePage: React.FC = () => {
  const loading = useAppSelector(state => state.article.loading);
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

const article = useAppSelector(state => state.article.items.find(a => a.id === id));
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  if (loading) return <Box textAlign="center" mt={4}><CircularProgress /></Box>;
  if (!id) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" color="error" align="center">
          Неверный идентификатор статьи
        </Typography>
        <Box mt={2} textAlign="center">
          <Button variant="contained" onClick={() => navigate(-1)}>
            Назад
          </Button>
        </Box>
      </Container>
    );
  }
 
  if (!article) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" color="error" align="center">
          Статья не найдена
        </Typography>
        <Box mt={2} textAlign="center">
          <Button variant="contained" onClick={() => navigate(-1)}>
            Назад
          </Button>
        </Box>
      </Container>
    );
  }

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  
  return (
    <Container maxWidth="md" sx={{ mt: "140px", mb: 8 }}>
      <PageHeader onHandleClick={handleOpenModal} articlePage={true} />

      {/* Заголовок статьи */}
      <Typography variant="h3" gutterBottom

      >
        {article.title}
      </Typography>

      {/* Контент статьи */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Центрируем по горизонтали
          '& img': {
            maxWidth: '100%', // Адаптируем изображение по ширине
            height: 'auto', // Высота будет устанавливаться автоматически
            mb: 2,
          },
          '& p': {
            mb: 2,
            textAlign: 'center', // Центрируем текст
          },
          whiteSpace: 'pre-line',
        }}
      >
        {article.image && <img src={article.image} alt="picture" />}
        <p style={{ textAlign: 'left' }}>{article.content}</p>
      </Box>

      {/* Модальное окно с формой */}
      <ModalForm handleCloseModal={handleCloseModal} openModal={openModal} />
    </Container>
  );
};

