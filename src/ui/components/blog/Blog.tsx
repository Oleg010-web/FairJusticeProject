import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchArticles } from '../../../store/slice/fetchArticles';
import Grid from '@mui/material/Grid';
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Card,
  Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import people from '../../../assets/images/people.png';
import lawCompanies from '../../../assets/images/lawCompanies.jpg'
import bankruptcyGeneral from '../../../assets/images/bankruptcyGeneral.png';
import court from '../../../assets/images/court.png';

export interface Article {
  id: string;
  categories: string[] | string;
  title: string;
  content: string;
  image: string | null;
}

export const Blog: React.FC = () => {
  const { items: articles, loading, error, success, items, } = useAppSelector(state => state.article);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (success === 'idle' && items.length === 0 && !loading) {
      dispatch(fetchArticles());
    }
  }, [dispatch, success]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach(article => {
      if (Array.isArray(article.categories)) {
        article.categories.forEach(c => {
          if (typeof c === 'string') set.add(c);
        });
      } else if (typeof article.categories === 'string') {
        set.add(article.categories);
      }
    });
    return Array.from(set).sort();
  }, [articles]);

  if (loading) return <Box textAlign="center" mt={4}><CircularProgress /></Box>;
  if (error) return <Typography color="error" mt={4} textAlign="center">{error}</Typography>;
  if (categories.length === 0) return <Typography mt={4} textAlign="center">Разделы не найдены</Typography>;

  const normalize = (str: string) => str.trim().toLowerCase();

  const categoryImages: Record<string, string> = {
    [normalize('Банкротство физических лиц')]: people,
    [normalize('Банкротство юридических лиц')]: lawCompanies,
    [normalize('Статьи о различных аспектах процесса банкротства')]: bankruptcyGeneral,
    [normalize('Роль и полномочия Арбитражного суда в процессе банкротства')]: court,
  };

 
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom>
          Разделы блога
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          На главную
        </Button>
      </Box>

      <Grid container spacing={2} marginTop={'60px'}>
        {categories.map((c, index: any) => {
          const bgImage = categoryImages[normalize(c)];
          return (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={c}>
              <Card
                sx={{
                  height: 350,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundImage: `url(${bgImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                component={Link}
                to={`/category/${encodeURIComponent(c)}`}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.3)', // менее плотный оверлей
                    zIndex: 1,
                  }}
                />
                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 2,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    p: 2,
                  }}
                >
                  {c}
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
