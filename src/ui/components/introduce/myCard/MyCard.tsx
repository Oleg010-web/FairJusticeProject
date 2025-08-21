import { Box, Typography } from '@mui/material';
import React, { useRef } from 'react';
import styles from './MyCard.module.scss';

interface MyCardProps {
  src: string;
  slogan: string;
  description: string;
  alt: string;
}

export const MyCard: React.FC<MyCardProps> = ({
  src,
  slogan,
  description,
  alt,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={cardRef}
      className={styles.myCard}
      sx={{ cursor: 'pointer', userSelect: 'none', marginBottom: '80px' }}
    >
      
        <Box className={styles.imageContainer}>
          <img src={src} alt={alt} className={styles.image} />
          <Typography className={styles.slogan} sx={{ fontSize: '1.5rem', fontWeight: '600' }}>
            {slogan}
          </Typography>

          {/* Дополнительный текст, появляется при ховере */}
          <Typography className={styles.description}>
            {description}
          </Typography>
      </Box>

    </Box>
  );
};


