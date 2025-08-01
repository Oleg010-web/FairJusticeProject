import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Modal } from '@mui/material';
import { useAppSelector } from '../../../../../store/store';
import { Form } from '../../../form/Form';
import { PageHeader } from '../categoryPageHeader/PageHeader';
import { ModalForm } from '../../../modal/ModalForm';

export const ArticlePage: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

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

  const article = useAppSelector(state => state.article.items.find(a => a.id === id));

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
    <Container maxWidth="md" sx={{ mt: "100px", mb: 8 }}>
      <PageHeader onHandleClick={handleOpenModal} articlePage={true}/>

      {/* Заголовок статьи */}
      <Typography variant="h3" component="h1" gutterBottom>
        {article.title}
      </Typography>

      {/* Контент статьи */}
      <Box
        sx={{
          '& img': { maxWidth: '100%', height: 'auto', mb: 2 },
          '& p': { mb: 2 },
          whiteSpace: 'pre-line',
          backgroundColor: 'transparent',
          color: '#FAEBD7'
        }}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Модальное окно с формой */}
      <ModalForm handleCloseModal={handleCloseModal} openModal={openModal}/>
    </Container>
  );
};

