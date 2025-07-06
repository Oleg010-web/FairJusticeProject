import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Box,
  Button,
  Pagination,
} from '@mui/material';

import styles from './CategoryPage.module.scss'; // если используете SCSS
import { fetchArticles } from '../../../../store/slice/fetchArticles';

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const decodedCategory = category ? decodeURIComponent(category) : '';
  const { items: articles, loading, error } = useAppSelector(state => state.article);
  const [page, setPage] = useState(1);
  const articlesPerPage = 6;
  const dispatch = useAppDispatch();

  const filteredArticles = React.useMemo(() => {
    if (!decodedCategory) return [];

    return articles.filter(article => {
      if (Array.isArray(article.categories)) {
        return article.categories.some(c => c === decodedCategory);
      } else if (typeof article.categories === 'string') {
        return article.categories === decodedCategory;
      }
      return false;
    });
  }, [articles, decodedCategory]);

  const pageCount = Math.ceil(filteredArticles.length / articlesPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const paginatedArticles = filteredArticles.slice(
    (page - 1) * articlesPerPage,
    page * articlesPerPage
  );

  useEffect(() => {
    if (articles.length === 0 && !loading && !error) {
      dispatch(fetchArticles());
    }
  }, [articles.length, loading, error, dispatch]);

  if (loading) return <Box textAlign="center" mt={4}><Typography>Загрузка...</Typography></Box>;
  if (error) return <Typography color="error" mt={4} textAlign="center">{error}</Typography>;
  if (!decodedCategory) return <Typography mt={4} textAlign="center">Категория не указана</Typography>;
  if (filteredArticles.length === 0) return <Typography mt={4} textAlign="center">Статьи не найдены</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box
        mb={3}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Статьи: {decodedCategory}
        </Typography>
        <Button variant="contained" component={Link} to="/blog" sx={{ alignSelf: { xs: 'stretch', sm: 'auto' } }}>
          Назад к разделам
        </Button>
      </Box>

      <Grid container spacing={3}>
        {paginatedArticles.map(article => (
          <Grid size={{ xs: 12 }} key={article.id}>
            <Card
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                p: 2,
                minHeight: 140,
                backgroundColor: 'transparent',
                color: '#FAEBD7'
              }}
            >
              {/* Картинка слева */}
              {article.image && (
                <CardMedia
                  component="img"
                  sx={{ width: 160, height: 120, borderRadius: 1, flexShrink: 0 }}
                  image={article.image}
                  alt={article.title}
                />
              )}

              {/* Контент и кнопка — в колонку */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  ml: 2,
                  position: 'relative',
                  
                }}
              >
                <CardActionArea
                  component={Link}
                  to={`/category/${encodeURIComponent(decodedCategory)}/${article.id}`}
                  sx={{ flexGrow: 1 }}
                  
                >
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="h6" component="h2" gutterBottom sx={{ overflowWrap: 'break-word' }}>
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
                        color: '#FAEBD7'
                      }}
                    >
                      {article.content.replace(/<[^>]+>/g, '').slice(0, 300)}{/* ограничим количество символов */}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                {/* Кнопка «Читать далее» — внизу справа, появляется при наведении на карточку */}
                <Button
                  variant="outlined"
                  size="small"
                  component={Link}
                  to={`/category/${encodeURIComponent(decodedCategory)}/${article.id}`}
                  className="readMoreBtn"
                  sx={{
                    alignSelf: 'flex-end',
                    mt: 1,
                    opacity: 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  Читать далее
                </Button>
              </Box>

              {/* Hover эффект для кнопки */}
              <style>{`
          .MuiCard-root:hover .readMoreBtn {
            opacity: 1;
            pointer-events: auto;
          }
        `}</style>
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

