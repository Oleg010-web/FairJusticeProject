import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './CategoryPage.module.scss';
import { PageHeader } from './categoryPageHeader/PageHeader';
import { useCategoryArticles } from './hook/useCategoryArticles';

export const CategoryPage: React.FC = () => {
  const {
    decodedCategory,
    articles,
    loading,
    error,
    page,
    pageCount,
    handlePageChange,
  } = useCategoryArticles(6);

  if (loading) return <Box textAlign="center" mt={4}><Typography>Загрузка...</Typography></Box>;
  if (error) return <Typography color="error" mt={4} textAlign="center">{error}</Typography>;
  if (!decodedCategory) return <Typography mt={4} textAlign="center">Категория не указана</Typography>;
  if (articles.length === 0) return <Typography mt={4} textAlign="center">Статьи не найдены</Typography>;

  return (
    <Container maxWidth="md" sx={{ maxWidth: '1280px' }}>
      <PageHeader />

      <Grid container spacing={3} sx={{ marginTop: '100px' }}>
        {articles.map(article => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
            <Card className={styles.card}>
              <Box
                className={styles['card-background']}
                sx={{
                  backgroundImage: `url(${article.image})`,
                }}
              />
              <Box className={styles['card-content']}>
                <CardActionArea
                  component={Link}
                  to={`/category/${encodeURIComponent(decodedCategory)}/${article.id}`}
                  sx={{ flexGrow: 1 }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {article.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                      }}
                    >
                      {article.content.replace(/<[^>]+>/g, '').slice(0, 300)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Button
                  variant="outlined"
                  size="small"
                  component={Link}
                  to={`/category/${encodeURIComponent(decodedCategory)}/${article.id}`}
                  className="readMoreBtn"
                >
                  Читать далее
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {pageCount > 1 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Container>
  );
};


