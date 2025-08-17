import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import styles from './Card.module.scss';
import lawyers1 from '../../../assets/lawyers1.avif';
import lawyers2 from '../../../assets/lawyers2.jpg';
import lawyers3 from '../../../assets/lawyers3.jpg';
import { MyCard } from './myCard/MyCard';

export const Card = () => {
  const [visibleCards, setVisibleCards] = useState<string[]>([]);
  const [clickedCards, setClickedCards] = useState<string[]>([]);
  const isMobile = window.innerWidth <= 768;

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

    useEffect(() => {
    // Если на мобильном устройстве, открываем все карточки 
    if (isMobile) {
      const allCardIds = [
        'card1',
        'card2',
        'card3',
      ];
      setClickedCards(allCardIds); // Открываем все карточки
    }
  }, [isMobile]);

  const handleClick = (id: string) => {
    setClickedCards(prev => 
      prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    );
  };

  return (
    <Box  sx={{ padding: 2, border: 'none'}}>
      <Typography variant="h2">Почему Вам стоит обратиться именно ко мне</Typography>
      <Box className={styles.cardContainer}>
        {[
          { id: 'card1', src: lawyers1, description: "С более чем десятилетним опытом в области банкротства, я ,как юрист, гарантирую профессиональный подход к каждому делу. Я уверенно веду клиентов через сложные процессы, защищая их интересы и обеспечивая максимальную выгоду. Ваши проблемы — мое дело! ", alt: "first image", visibleClass: styles['visible-left'], slogan: 'Более 10 лет опыта ведения банкротных дел' },
          { id: 'card2', src: lawyers2, description: "Как ваш юрист, я ценю уникальность каждой ситуации. Индивидуальный подход к каждому клиенту позволяет мне глубже понять ваши потребности, обеспечить качественную защиту ваших интересов и предложить решения, которые действительно работают именно для вас. ", alt: "second image", visibleClass: styles['visible-right'], slogan: 'Индивидуальный подход к каждому' },
          { id: 'card3', src: lawyers3, description: "Выбирая меня в качестве вашего юриста, вы получаете уверенность в успехе. Я ставлю перед собой четкие цели и тщательно разрабатываю стратегию, чтобы гарантировать результат. Ваши интересы — моя приоритетная задача, и я делаю все возможное, чтобы оправдать ваше доверие.", alt: "third image", visibleClass: styles['visible-left'], slogan: 'Гарантия результата каждому клиенту' },
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


