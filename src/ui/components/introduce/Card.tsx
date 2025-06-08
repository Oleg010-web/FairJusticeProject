import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import styles from './Card.module.scss';
import lawyers1 from '../../../assets/lawyers1.avif';
import lawyers2 from '../../../assets/lawyers2.jpg';
import lawyers3 from '../../../assets/lawyers3.jpg';
import { MyCard } from './myCard/MyCard';

export const Card = () => {
  const [visibleCards, setVisibleCards] = useState<string[]>([]);
  const [clickedCards, setClickedCards] = useState<string[]>([]);

  const checkVisibility = () => {
    const cards = document.querySelectorAll(`.${styles.card}`);
    const windowHeight = window.innerHeight;

    cards.forEach(card => {
      const cardRect = card.getBoundingClientRect();
      if (cardRect.top < windowHeight && cardRect.bottom > 0) {
        setVisibleCards(prevVisible => [...new Set([...prevVisible, card.id])]);
      }
    });
  };

  useEffect(() => {
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    return () => {
      window.removeEventListener('scroll', checkVisibility);
    };
  }, []);

  const handleClick = (id: string) => {
    setClickedCards(prev => 
      prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    );
  };

  return (
    <Box sx={{ marginTop: '30px' }}>
      <Typography variant="h2">Почему мы лучшие</Typography>
      <Box className={styles.cardContainer}>
        {[
          { id: 'card1', src: lawyers1, description: "Текст под картинкой 1", alt: "first image", visibleClass: styles['visible-left'], slogan: 'Место для короткого слогана' },
          { id: 'card2', src: lawyers2, description: "Текст под картинкой 2", alt: "second image", visibleClass: styles['visible-right'], slogan: 'Место для короткого слогана' },
          { id: 'card3', src: lawyers3, description: "Текст под картинкой 3", alt: "third image", visibleClass: styles['visible-left'], slogan: 'Место для короткого слогана' },
        ].map(({ id, src, description, alt, visibleClass, slogan }) => (
          <Box
            key={id}
            className={`${styles.card} ${visibleCards.includes(id) ? styles.visible : ''} ${visibleCards.includes(id) ? visibleClass : ''}`}
            id={id}
          >
            <MyCard
              src={src}
              description={description}
              alt={alt}
              showDescription={clickedCards.includes(id)}
              onClick={() => handleClick(id)}
              slogan={slogan}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};


