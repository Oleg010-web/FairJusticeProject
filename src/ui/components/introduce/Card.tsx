import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import styles from './Card.module.scss';
import lawyers1 from '../../../assets/lawyers1.avif';
import lawyers2 from '../../../assets/lawyers2.jpg';
import lawyers3 from '../../../assets/lawyers3.jpg';
import { MyCard } from './myCard/MyCard';

export const Card = () => {

  return (
    <Box sx={{ padding: 2, border: 'none' }}>
      <Typography variant="h2">Почему Вам стоит обратиться именно ко мне</Typography>
      <Box className={styles.cardContainer}>
        {[
          { id: 'card1', src: lawyers1, description: "С более чем десятилетним опытом в области банкротства, я ,как арбитражный управляющий, гарантирую профессиональный подход к каждому делу. Я уверенно веду клиентов через сложные процессы, защищая их интересы и обеспечивая максимальную выгоду. Ваши проблемы — мое дело! ", alt: "first image", slogan: '10+ лет опыта ведения банкротных дел' },
          { id: 'card2', src: lawyers2, description: "Как арбитражный управляющий, я ценю уникальность каждой ситуации. Индивидуальный подход к каждому делу клиента позволяет мне глубже понять его потребности, обеспечить качественную защиту интересов и предложить решения, которые действительно работают именно для клиента. ", alt: "second image", slogan: 'Индивидуальный подход к каждому' },
          { id: 'card3', src: lawyers3, description: "Я ставлю перед собой четкие цели и тщательно разрабатываю стратегию, чтобы гарантировать результат. Ваши интересы — моя приоритетная задача, и я делаю все возможное, чтобы оправдать ваше доверие.", alt: "third image", slogan: 'Гарантия результата каждому клиенту' },
        ].map(({ id, src, description, alt, slogan }) => (
          <Box
            key={id}
            className={styles.myCard} // Убираем управление видимостью
            id={id}
          >
            <MyCard
              src={src}
              description={description}
              alt={alt}
              slogan={slogan}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};



