import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import styles from './MyCard.module.scss';

interface MyCardProps {
  src: string;
  slogan: string;
  description: string;
  alt: string;
  showDescription: boolean;
  onClick: () => void;
}

export const MyCard: React.FC<MyCardProps> = ({
  src,
  slogan,
  description,
  alt,
  showDescription,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      onClick(); // Закрываем описание при клике вне карточки
    }
  };

  useEffect(() => {
    if (showDescription) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDescription]);

  return (
    <Box
      ref={cardRef}
      className={styles.myCard}
      onClick={onClick}
      sx={{ cursor: 'pointer', userSelect: 'none', marginBottom: '80px' }}
    >
      <Box className={styles.imageContainer}>
        <img src={src} alt={alt} className={styles.image} />
        <Typography className={styles.slogan} sx={{fontSize: '1.5rem', fontWeight: '600'}}>{slogan}</Typography>

        {/* Дополнительный текст, появляется при клике */}
        <Typography
          className={styles.description}
          sx={{
            opacity: showDescription ? 1 : 0,
            pointerEvents: showDescription ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
            
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};


