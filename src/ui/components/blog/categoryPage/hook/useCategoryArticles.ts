import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { fetchArticles } from '../../../../../store/slice/fetchArticles';

export const useCategoryArticles = (articlesPerPage = 6) => {
  const { category } = useParams<{ category: string }>();
  const decodedCategory = category ? decodeURIComponent(category) : '';
  const { items: articles, loading, error } = useAppSelector(state => state.article);
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);

  // Фильтрация статей по категории
  const filteredArticles = useMemo(() => {
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

  // Пагинация
  const paginatedArticles = useMemo(() => {
    const start = (page - 1) * articlesPerPage;
    const end = page * articlesPerPage;
    return filteredArticles.slice(start, end);
  }, [filteredArticles, page, articlesPerPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (articles.length === 0 && !loading && !error) {
      dispatch(fetchArticles());
    }
  }, [articles.length, loading, error, dispatch]);

  return {
    decodedCategory,
    articles: paginatedArticles,
    loading,
    error,
    page,
    pageCount,
    handlePageChange,
  };
};
