import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import client from '../../../assets/images/person.svg'
import company from '../../../assets/images/forCompanys.svg'
import styles from './Services.module.scss';
import { Box, Paper } from '@mui/material';


// Создаем стилизованный компонент Card
const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    textAlign: 'center',
    boxShadow: 'none', // Убирает тень
    border: 'none', // Убирает границы
    transition: 'transform 0.3s, border 0.3s', // Плавный переход
    '&:hover': {
        transform: 'scale(1.05)', // Увеличение размера
        border: '2px solid purple', // Фиолетовая граница
    },
}));

export const Services = () => {

    const [visibleCards, setVisibleCards] = useState<string[]>([]);

    const handleScrollServices = () => {
        const cards = document.querySelectorAll(`.${styles.card}`);
        const windowHeight = window.innerHeight;

        cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            if (cardRect.top < windowHeight && cardRect.bottom > 0) {
                // Если карточка видима в области просмотра, добавляем класс
                setVisibleCards(prevVisible => [...new Set([...prevVisible, card.id])]);
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScrollServices);
        return () => window.removeEventListener('scroll', handleScrollServices);
    }, []);

    return (
        <Box component={Paper} elevation={3} sx={{ padding: 2, marginTop: '10px', backgroundColor: 'transparent', border: 'none' }}>
            <Container style={{ padding: '70px' }}>
                <Stack
                    direction={{ xs: "column", sm: "row" }} // Изменяем направление для мобильных и более крупных экранов
                    spacing={12}
                    justifyContent="center"
                    style={{ marginTop: '50px' }}
                >
                    <Link to="/services-individuals" style={{ textDecoration: 'none' }}>
                        <StyledCard
                            className={`${styles.card} ${visibleCards.includes('card1') ? styles.visible : ''}`}
                            id="card1"
                        >
                            <CardMedia
                                component="img"
                                alt="Услуги для физических лиц"
                                height="200"
                                image={client} // Замените на реальный URL
                            />
                            <Typography variant="h6" component="div">
                                Услуги для физических лиц
                            </Typography>
                        </StyledCard>
                    </Link>
                    <Link to="/services-legalentities" style={{ textDecoration: 'none' }}>
                        <StyledCard
                            className={`${styles.card} ${visibleCards.includes('card2') ? styles.visible : ''}`}
                            id="card2"
                        >
                            <CardMedia
                                component="img"
                                alt="Услуги для юридических лиц"
                                height="200"
                                image={company} // Замените на реальный URL
                            />
                            <Typography variant="h6" component="div">
                                Услуги для юридических лиц
                            </Typography>
                        </StyledCard>
                    </Link>
                </Stack>
            </Container>
        </Box>
    );
};


